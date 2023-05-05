import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './components/NavBar/NavBar'
import RegisterModal from './components/Modals/RegisterModal'
import ToasterProvider from './Providers/ToasterProvider'
import LoginModal from './components/Modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/Modals/RentModal'
import SearchModal from './components/Modals/SearchModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: ' Find the Perfect Vacation Rental | My Airbnb Clone App ',
  description: 'Discover the perfect vacation rental with My Airbnb Clone App. Browse a wide selection of unique accommodations around the world and book your next stay today.',
  keywords: ['Airbnb clone', 'vacation rental', 'accommodation', 'travel', 'booking']
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
        <SearchModal />
        <NavBar currentUser={currentUser} />
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
