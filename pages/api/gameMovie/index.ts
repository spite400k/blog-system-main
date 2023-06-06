import { NextApiRequest, NextApiResponse } from 'next'

import { Category } from 'category/types/category'
import admin from 'firebase-admin'
import { GameMovie } from 'components/gameMovie/types/gameMovie'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
            /\\n/g,
            '\n'
          ),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        })
      })
    }

    const query = req.query
    const category = query.category
    const db = admin.firestore()

    const docCategory = await db
      .collection('category')
      .where('name', '==', category ?? '')
      .get()
    const docGameMovies = !docCategory.empty
      ? await db
          .collection('gameMovie')
          .where('category', '==', (docCategory.docs[0].data() as Category).id)
          .orderBy('releaseDate')
          .orderBy('insDate', 'desc')
          .get()
      : await db
          .collection('gameMovie')
          .orderBy('releaseDate', 'desc')
          .orderBy('insDate', 'desc')
          .get()

    if (docGameMovies.empty) {
      return res.status(200).json([])
    }

    const gameMovies = docGameMovies.docs.map((docGameMovie) => {
      const gameMovie = docGameMovie.data() as GameMovie
      return {
        id: gameMovie.id,
        title: gameMovie.title,
        slug: gameMovie.slug,
        releaseDate: gameMovie.releaseDate.toDate(),
        markdown: gameMovie.markdown,
        thumbnail: gameMovie.thumbnail,
        custom: gameMovie.custom ?? {}
      }
    })

    return res.status(200).json(gameMovies)
  }
}

export default handler
