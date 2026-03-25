import { useState } from 'react'
import PageShell from '../components/layout/PageShell'

interface Stream {
  name: string
  country: string
  flag: string
  description: string
  embedUrl: string
}

const STREAMS: { region: string; channels: Stream[] }[] = [
  {
    region: 'Americas',
    channels: [
      {
        name: 'Bloomberg Television',
        country: 'USA',
        flag: '🇺🇸',
        description: 'Global business & markets news, 24/7',
        embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCIALMKvObZNtJ6AmdCLP7Lg',
      },
      {
        name: 'Yahoo Finance',
        country: 'USA',
        flag: '🇺🇸',
        description: 'Live market coverage, earnings & analysis',
        embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCEAZeUIeJs_0v_3EtlJVimA',
      },
      {
        name: 'CNBC',
        country: 'USA',
        flag: '🇺🇸',
        description: 'Business news, Wall Street & global markets',
        embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCrp_UI8XtuYfpiqluWLD7Lw',
      },
    ],
  },
  {
    region: 'Europe',
    channels: [
      {
        name: 'Euronews Business',
        country: 'Europe',
        flag: '🇪🇺',
        description: 'European business & financial news',
        embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCW5yhzFg9TFoOVDJQwdCVkQ',
      },
      {
        name: 'onvista Börse Live',
        country: 'Germany',
        flag: '🇩🇪',
        description: 'Live German stock market news and analysis from onvista',
        embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCHZa-ouaCwwNeBNIy0sADqQ',
      },
    ],
  },
]

export default function LivePage() {
  const [active, setActive] = useState<Stream>(STREAMS[0].channels[0])

  return (
    <PageShell>
      <div className="pt-8 pb-14">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-medium text-accent uppercase tracking-wider mb-3">Live TV</p>
          <h1 className="text-3xl font-bold text-text-1 tracking-tight">Finance Television</h1>
          <p className="text-text-2 text-sm mt-2">Free live streams from global business news channels.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Channel list */}
          <div className="flex flex-col gap-6">
            {STREAMS.map((group) => (
              <div key={group.region}>
                <p className="text-[10px] font-medium text-text-3 uppercase tracking-wider mb-2 px-1">
                  {group.region}
                </p>
                <div className="flex flex-col gap-1">
                  {group.channels.map((ch) => (
                    <button
                      key={ch.name}
                      onClick={() => setActive(ch)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                        active.name === ch.name
                          ? 'bg-accent/10 border border-accent/20'
                          : 'hover:bg-surface-2 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base leading-none">{ch.flag}</span>
                        <div className="min-w-0">
                          <p className={`text-sm font-medium truncate ${active.name === ch.name ? 'text-text-1' : 'text-text-2'}`}>
                            {ch.name}
                          </p>
                          <p className="text-[10px] text-text-3 truncate mt-0.5">{ch.country}</p>
                        </div>
                        {active.name === ch.name && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent animate-live-dot flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Player */}
          <div className="flex flex-col gap-4">
            <div className="card overflow-hidden">
              <div className="aspect-video w-full bg-surface-2">
                <iframe
                  key={active.embedUrl}
                  src={active.embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={active.name}
                />
              </div>
              <div className="p-4 flex items-start gap-3">
                <span className="text-2xl leading-none mt-0.5">{active.flag}</span>
                <div>
                  <h2 className="text-sm font-semibold text-text-1">{active.name}</h2>
                  <p className="text-xs text-text-3 mt-0.5">{active.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
