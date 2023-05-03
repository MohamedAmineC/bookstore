import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './components/NavBar/NavBar'
import RegisterModal from './components/Modals/RegisterModal'
import ToasterProvider from './Providers/ToasterProvider'
import LoginModal from './components/Modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/Modals/RentModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BookMate - Borrow and Share Books with Your Friends',
  description: 'BookMate is a social media application that connects friends and enables them to borrow and share books with each other. With BookMate, you can easily browse your friends\' libraries, discover new books, and borrow the books you\'re interested in. The platform also allows you to search for specific books among nearby users, making it easy to find hard-to-find titles. BookMate is the perfect solution for book lovers who want to share their passion for reading with their friends. Sign up today and start sharing your favorite books with BookMate!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <RegisterModal />
        <ToasterProvider />
        <LoginModal />
        <RentModal />
        <NavBar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
