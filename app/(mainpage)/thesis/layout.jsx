import ThesisNav from './components/ThesisNav'
import tokenStyles from './brand-tokens.module.css'

export const metadata = {
  title: 'The Chainfren thesis',
  description: 'A public argument for a better internet from Lagos.',
}

export default function ThesisLayout({ children }) {
  return (
    <div className={tokenStyles.shell}>
      <ThesisNav />
      {children}
    </div>
  )
}
