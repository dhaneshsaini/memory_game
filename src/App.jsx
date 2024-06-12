import { useEffect, useState } from "react"

function generateRandomArray() {
  const emoji = ['🐵', '🐶', '🐱', '🦁', '🐰', '🐼', '🐮', '🐭']
  const newIconsArray = emoji.concat(emoji).sort(() => Math.random() - 0.5)

  return newIconsArray.map((item, i) => ({
    id: i,
    icon: item,
    isFlipped: false,
    isMatched: false,
  }))
}

export default function App() {
  const [icons, setIcons] = useState(generateRandomArray())
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCount, setMatchedCount] = useState(0)
  const [move, setMove] = useState(0)

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (icons[firstIndex].icon === icons[secondIndex].icon) {
        setTimeout(() => {
          setIcons(prevIcons =>
            prevIcons.map((icon, index) =>
              index === firstIndex || index === secondIndex
                ? { ...icon, isMatched: true }
                : icon
            )
          );
          setMatchedCount(matchedCount + 1)
          setFlippedCards([])
        }, 1000)
      } else {
        setTimeout(() => {
          setIcons(prevIcons =>
            prevIcons.map((icon, index) =>
              index === firstIndex || index === secondIndex
                ? { ...icon, isFlipped: false }
                : icon
            )
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [flippedCards, icons, matchedCount])

  function handleCardClick(index) {
    if (flippedCards.length < 2 && !icons[index].isFlipped && !icons[index].isMatched) {
      setIcons(prevIcons =>
        prevIcons.map((item, i) =>
          i === index ? { ...item, isFlipped: true } : item
        )
      )
      setFlippedCards([...flippedCards, index])
      setMove(move + .5)
    }
  }

  return (
    <section className="max-w-2xl mx-auto bg-stone-100 min-h-screen">
      <div className="text-center py-10">
        <h1 className="font-semibold text-2xl">Memory Game</h1>
      </div>
      <div className="text-center mb-5">
        <h2>MOVES: {move.toFixed(0)}</h2>
      </div>
      <div className="flex justify-center">
        <div className="grid gap-5 grid-cols-4 max-w-[380px] place-items-center">
          {icons.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(index)}
              className="flex w-20 h-20 justify-center items-center bg-white rounded-lg drop-shadow-md cursor-pointer">
              {item.isFlipped ? <span className="text-4xl">{item.icon}</span> : ''}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
