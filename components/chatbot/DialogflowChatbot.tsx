'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function DialogflowChatbot() {
  useEffect(() => {
    // This effect will run only on the client-side
  }, [])

  return (
    <>
      <Script
        src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
        strategy="lazyOnload"
      />
      <df-messenger
        intent="WELCOME"
        chat-title="ChatBot"
        agent-id="fa2bef43-0f18-4c5f-8da0-9c24485b6284"
        language-code="en"
      ></df-messenger>
    </>
  )
}

