'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Brain, Timer } from 'lucide-react'

// Mock data - In production this would come from an API/database
const mockQuestions = [
  {
    id: 1,
    category: 'Historia',
    question: '¿En qué año se descubrió América?',
    options: ['1492', '1489', '1495', '1500'],
    correctAnswer: '1492',
  },
  {
    id: 2,
    category: 'Ciencia',
    question: '¿Cuál es el elemento químico más abundante en el universo?',
    options: ['Oxígeno', 'Hidrógeno', 'Helio', 'Carbono'],
    correctAnswer: 'Hidrógeno',
  },
]

export default function QuizPage() {
  const { data: session } = useSession()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleAnswer = () => {
    if (selectedAnswer === mockQuestions[currentQuestion].correctAnswer) {
      setScore(score + 100)
    }
    setIsAnswered(true)
  }

  const handleNext = () => {
    setSelectedAnswer('')
    setIsAnswered(false)
    setCurrentQuestion(currentQuestion + 1)
    setTimeLeft(30)
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Quiz</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            <span className="font-medium">{timeLeft}s</span>
          </div>
          <div className="text-sm">
            Puntuación: <span className="font-bold">{score}</span>
          </div>
        </div>
      </div>

      {currentQuestion < mockQuestions.length ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pregunta {currentQuestion + 1}</CardTitle>
              <span className="text-sm text-muted-foreground">
                {mockQuestions[currentQuestion].category}
              </span>
            </div>
            <Progress value={(currentQuestion / mockQuestions.length) * 100} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg font-medium">{mockQuestions[currentQuestion].question}</p>
            <RadioGroup
              value={selectedAnswer}
              onValueChange={setSelectedAnswer}
              className="space-y-3"
            >
              {mockQuestions[currentQuestion].options.map((option) => (
                <div
                  key={option}
                  className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                    isAnswered
                      ? option === mockQuestions[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-950'
                        : option === selectedAnswer
                          ? 'border-red-500 bg-red-50 dark:bg-red-950'
                          : ''
                      : 'hover:bg-accent'
                  }`}
                >
                  <RadioGroupItem value={option} id={option} disabled={isAnswered} />
                  <Label htmlFor={option} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-end">
              {!isAnswered ? (
                <Button onClick={handleAnswer} disabled={!selectedAnswer}>
                  Responder
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  {currentQuestion === mockQuestions.length - 1 ? 'Ver resultados' : 'Siguiente'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>¡Quiz completado!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Tu puntuación final: <span className="font-bold">{score}</span>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
