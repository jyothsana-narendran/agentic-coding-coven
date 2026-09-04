import { useEffect, useRef, useState } from 'react'

interface SpeechRecognitionAlternativeLike { transcript: string }
interface SpeechRecognitionResultLike {
  readonly isFinal: boolean
  readonly length: number
  [index: number]: SpeechRecognitionAlternativeLike
}
interface SpeechRecognitionResultListLike {
  readonly length: number
  [index: number]: SpeechRecognitionResultLike
}
interface SpeechRecognitionEventLike extends Event {
  readonly resultIndex: number
  readonly results: SpeechRecognitionResultListLike
}
interface SpeechRecognitionErrorEventLike extends Event { readonly error: string }
interface SpeechRecognitionLike {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null
  onend: (() => void) | null
}
interface SpeechRecognitionConstructor { new (): SpeechRecognitionLike }
type SpeechWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor
  webkitSpeechRecognition?: SpeechRecognitionConstructor
}

interface Props {
  value: string
  disabled: boolean
  onTranscript: (value: string) => void
  onListeningChange: (listening: boolean) => void
  onError: (message: string) => void
}

function joinTranscript(base: string, speech: string): string {
  const trimmedBase = base.trimEnd()
  const trimmedSpeech = speech.trim()
  if (!trimmedSpeech) return trimmedBase
  return trimmedBase ? `${trimmedBase} ${trimmedSpeech}` : trimmedSpeech
}

export function VoiceInput({ value, disabled, onTranscript, onListeningChange, onError }: Props) {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const baseTextRef = useRef('')
  const finalChunksRef = useRef(new Map<number, string>())
  const stoppedIntentionallyRef = useRef(false)
  const [listening, setListening] = useState(false)
  const [status, setStatus] = useState('Speak naturally. Recognized words will appear in your answer.')
  const browserWindow = window as SpeechWindow
  const Recognition = browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition
  const supported = Boolean(Recognition)

  useEffect(() => () => {
    recognitionRef.current?.abort()
    recognitionRef.current = null
  }, [])

  function finishListening(message: string) {
    setListening(false)
    onListeningChange(false)
    setStatus(message)
  }

  function startListening() {
    if (!Recognition || disabled || listening) return
    baseTextRef.current = value
    finalChunksRef.current.clear()
    stoppedIntentionallyRef.current = false
    onError('')

    const recognition = new Recognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = navigator.language || 'en-US'
    recognition.onresult = (event) => {
      let interim = ''
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index]
        const transcript = result[0]?.transcript?.trim() ?? ''
        if (!transcript) continue
        if (result.isFinal) finalChunksRef.current.set(index, transcript)
        else interim += `${transcript} `
      }
      const finalText = [...finalChunksRef.current.entries()].sort(([a], [b]) => a - b).map(([, text]) => text).join(' ')
      onTranscript(joinTranscript(baseTextRef.current, `${finalText} ${interim}`))
      setStatus(interim.trim() ? `Listening… ${interim.trim()}` : 'Listening…')
    }
    recognition.onerror = (event) => {
      const permissionDenied = event.error === 'not-allowed' || event.error === 'service-not-allowed'
      onError(permissionDenied
        ? 'Microphone access was denied. Allow it in your browser settings or type your response.'
        : event.error === 'no-speech'
          ? 'No speech was detected. Try speaking again or type your response.'
          : 'Voice input stopped unexpectedly. You can try again or continue typing.')
      finishListening('Voice input stopped.')
    }
    recognition.onend = () => {
      recognitionRef.current = null
      finishListening(stoppedIntentionallyRef.current ? 'Speech added. Review or edit your answer before submitting.' : 'Listening ended. You can start speaking again or continue typing.')
    }

    recognitionRef.current = recognition
    try {
      recognition.start()
      setListening(true)
      onListeningChange(true)
      setStatus('Listening…')
    } catch {
      recognitionRef.current = null
      onError('Voice input could not be started. Try again or type your response.')
      finishListening('Voice input is unavailable.')
    }
  }

  function stopListening() {
    stoppedIntentionallyRef.current = true
    recognitionRef.current?.stop()
  }

  if (!supported) return <div className="voice-input unsupported"><p>Voice input is not supported in this browser. You can still type your answer.</p></div>

  return <div className={`voice-input ${listening ? 'is-listening' : ''}`}>
    <div><strong>{listening ? 'Listening to your response…' : 'Prefer to speak?'}</strong><span aria-live="polite">{status}</span></div>
    <div className="voice-controls">
      <button className="button button-secondary" type="button" disabled={disabled || listening} onClick={startListening}>Start speaking</button>
      <button className="button button-stop" type="button" disabled={!listening} onClick={stopListening}>Stop speaking</button>
    </div>
  </div>
}
