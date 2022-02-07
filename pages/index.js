import Head from 'next/head'
import { useUser } from '../hooks/useUser'
import { AppLayout } from '../components/AppLayout'
import { ButtonLink } from '../components/ButtonLink'
import { Logo } from '../components/Logo'
import { loginWithGitHub, getHighScores } from '../firebase/client'
import { GitHub } from '../components/Icons/GitHub'
import { ButtonLogin } from '../components/ButtonLogin'
import { UserInfo } from '../components/UserInfo'
import { useState, useEffect } from 'react'

export default function Home() {
  const user = useUser()
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    getHighScores().then(setLeaderboard)
  }, [])

  const handleClick = () => {
    loginWithGitHub().catch((error) => console.log(error))
  }

  return (
    <>
      <Head>
        <title>Higher or Lower YT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <Logo />
        <ButtonLink href="/playGame">PLAY</ButtonLink>
        {user === null ? (
          <ButtonLogin onClick={() => handleClick()} bg="#3d3d3d" color="#ffff">
            <GitHub fill="#fff" width={24} height={24} />
            Sign in with GitHub
          </ButtonLogin>
        ) : user === undefined ? null : (
          <UserInfo
            avatar={user.avatar}
            userName={user.userName}
            position="relative"
          />
        )}
      </AppLayout>
      <AppLayout>
        <div>
          <h1>Leaderboard</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((person, index) => (
                <tr key={person.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={person.avatar} width="20px" height="20px" />
                    <strong>{person.userName}</strong>
                  </td>
                  <td>{person.highScore}</td>
                  <td>{person.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AppLayout>
      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: column;
          }
          h1 {
            text-align: center;
            margin-bottom: 30px;
          }
          table {
            width: 100%;
            border-spacing: 0 0;
            background: #213b4c;
            color: white;
            box-shadow: 0 0 20px #1e3344;
            border-radius: 20px;
            overflow: hidden;
          }
          th {
            background: #0c1e28;
            border: none;
            margin: 0;
            padding: 0;
            text-align: center;
            padding: 20px 0px 20px 0px;
            width: 100px;
          }
          th:first-of-type {
            padding: 0 30px;
            text-align: center;
          }
          th:last-of-type {
            padding: 0 30px;
          }
          th:nth-child(2) {
            width: max(12vw, 100px);
          }
          td {
            text-align: center;
            padding: 10px 0px;
          }
          td:nth-child(1) {
            padding: 10px 30px 10px 30px;
          }
          td:nth-child(2) {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          img {
            margin-right: 5px;
          }
        `}
      </style>
    </>
  )
}
