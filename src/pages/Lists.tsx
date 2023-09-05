import Navbar from "../components/Navbar"
import { useAppSelector } from "../app/hooks"

const Lists = () => {
  const { isDarkMode } = useAppSelector((state) => state.global)
  return (
    <>
      <Navbar />
      <main className={`${isDarkMode ? "bg-161616" : "bg-f3eed9"} h-screen`}>
        <div className="row">
          <div
            className={`${
              isDarkMode ? "text-white" : "text-black"
            } container min-h-screen relative`}
          >
            <h1 className="mt-8 text-left px-5 text-2xl underline underline-offset-4 font-medium tracking-wider">
              Anime
            </h1>
            <h2 className="mt-4 text-left px-5 text-lg underline underline-offset-4 font-medium tracking-wider">
              Series
            </h2>
            <ol className="text-left px-9 list-decimal">
              <li>Hunter x Hunter</li>
              <li>Death Note</li>
              <li>Code Geass: Lelouch of the Rebellion</li>
              <li>Toradora</li>
              <li className="text-indigo-700">One Punch Man</li>
              <li className="text-indigo-700">
                Don't Toy With Me, Miss Nagatoro
              </li>
              <li>Food Wars!: Shokugeki no Soma</li>
              <li className="text-indigo-700">
                Demon Slayer: Kimetsu no Yaiba
              </li>
              <li>Fullmetal Alchemist</li>
              <li>Ping Pong the Animation</li>
              <li>Fullmetal Alchemist: Brotherhood</li>
              <li className="text-green-700">One Piece</li>
              <li className="text-indigo-700">Attack on Titan</li>
              <li className="text-red-700">Jujutsu Kaisen</li>
              <li className="text-green-700">Dragon Ball Z</li>
              <li>Dragon Ball</li>
              <li className="text-indigo-700">BLUELOCK</li>
              <li>Mob Psycho 100</li>
              <li className="text-green-700">
                Zom 100: Bucket List of the Dead
              </li>
              <li>Cowboy Bebop</li>
            </ol>
            <h2 className="mt-4 text-left px-5 text-lg underline underline-offset-4 font-medium tracking-wider">
              Movies
            </h2>
            <ol className="text-left px-9 list-decimal">
              <li>Your Name</li>
              <li>Demon Slayer: Mugen Train</li>
              <li>Jujutsu Kaisen 0</li>
              <li>One Piece Film: RED</li>
            </ol>
          </div>
        </div>
      </main>
    </>
  )
}

export default Lists
