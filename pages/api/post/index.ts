import { NextApiRequest, NextApiResponse } from 'next'
import { Post } from 'post/types/post'
import { Category } from 'category/types/category'
import admin from 'firebase-admin'

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
    const docPosts = !docCategory.empty
      ? await db
          .collection('post')
          .where('category', '==', (docCategory.docs[0].data() as Category).id)
          .orderBy('releaseDate')
          .orderBy('insDate', 'desc')
          .get()
      : await db
          .collection('post')
          .orderBy('releaseDate', 'desc')
          .orderBy('insDate', 'desc')
          .get()

    console.dir('db:' + db)
    console.dir('docPosts:' + docPosts)

    if (docPosts.empty) {
      return res.status(200).json([])
    }

    const posts = docPosts.docs.map((docPost) => {
      const post = docPost.data() as Post
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        releaseDate: post.releaseDate.toDate(),
        markdown: post.markdown,
        thumbnail: post.thumbnail,
        custom: post.custom ?? {}
      }
    })

    return res.status(200).json(posts)
  }
}

export default handler
