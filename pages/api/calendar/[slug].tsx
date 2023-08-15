import { NextApiRequest, NextApiResponse } from 'next'
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
    const slug = query.slug as string
    const db = admin.firestore()

    const docCalendar = await db.collection('tbl_calendar').where('slug', '==', slug).get()

    if (docCalendar.empty) {
      return res.status(404).json({ message: 'slug is invalid' })
    }

    const calendar = docCalendar.docs[0].data() as CalendarType

    console.log(calendar)

    return res.status(200).json({
      id: calendar.id,
      title: calendar.title,
      start: calendar.start,
      end: calendar.end,
      description: calendar.description,
      backgroundColor: calendar.backgroundColor,
      borderColor: calendar.borderColor,
      
      releaseDate: calendar.releaseDate.toDate(),
    })
  }
}

export default handler
