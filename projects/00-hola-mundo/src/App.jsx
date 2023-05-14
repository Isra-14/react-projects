import './App.css'
import { TwiterFollowCard } from './TwitterFollowCard'

const users = [
  {
    userName: 'isra-14',
    name: 'Israel Sanchez',
    isFollowing: true
  },
  {
    userName: 'diegommtz',
    name: 'Diego Montoya',
    isFollowing: false
  },
  {
    userName: 'RodrigoSebastian',
    name: 'Rodrigo Sebastian',
    isFollowing: true
  }
]

export function App() {
  return (
    <section className='App'>
      {
        users.map(({ userName, name, isFollowing }) => (
            <TwiterFollowCard
              userName={userName}
              initialIsFollowing={isFollowing}
              key={userName}
            >
              {name}
            </TwiterFollowCard>
        ))
      }
    </section>
  )
}