import { NextApiRequest, NextApiResponse } from 'next'
import { Category } from 'category/types/category'
import admin from 'firebase-admin'
import { CalendarType } from 'components/features/ calendar/types/calendar'

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
    const docCalendars = !docCategory.empty
      ? await db
          .collection('tbl_calendar')
          .where('category', '==', (docCategory.docs[0].data() as Category).id)
          .orderBy('releaseDate')
          .orderBy('insDate', 'desc')
          .get()
      : await db
          .collection('tbl_calendar')
          .orderBy('releaseDate', 'desc')
          .orderBy('insDate', 'desc')
          .get()

    if (docCalendars.empty) {
      return res.status(200).json([])
    }

    const calendars = docCalendars.docs.map((docCalendar) => {
      const calendar = docCalendar.data() as CalendarType

      return {
        id: calendar.id,
        title: calendar.title,
        start: calendar.start,
        end: calendar.end,
        description: calendar.description,
        backgroundColor: calendar.backgroundColor,
        borderColor: calendar.borderColor,
        
        releaseDate: calendar.releaseDate.toDate(),

      }
    })

    return res.status(200).json(calendars)
  }
}

export default handler
