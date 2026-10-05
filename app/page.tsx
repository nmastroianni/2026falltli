import data from '@/lib/data.json'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Presentation } from 'lucide-react'
export default function Home() {
  return (
    <div className="p-4 lg:p-0">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-4 lg:gap-8">
        {data.length > 0 &&
          data.map((session) => {
            return (
              <Link
                key={session.id}
                href={`/${session.id}`}
                aria-labelledby={`${session.id}`}
                className="w-full lg:w-80"
              >
                <Card className="bg-neutral-900 h-full hover:shadow-lg shadow-purple-500 hover:bg-neutral-800 hover:shadow-purple-800 transition ease-in-out duration-300">
                  <CardHeader>
                    <Presentation className="mx-auto" />
                    <CardTitle
                      className="text-center leading-6 font-semibold"
                      id={`session-${session.id}`}
                    >
                      {session.SessionTitle}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
