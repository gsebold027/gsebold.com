import { PassThrough, Readable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { type EntryContext, ServerRouter } from 'react-router'

// Only runs at build time to prerender /en and /pt (react-router.config.ts); there is no server in
// production. Waits for the whole tree, lazy parts included, so the static HTML is complete.
export const streamTimeout = 10_000

const handleRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext
) =>
  new Promise<Response>((resolve, reject) => {
    let statusCode = responseStatusCode

    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        onAllReady() {
          const body = new PassThrough()
          responseHeaders.set('Content-Type', 'text/html')
          resolve(
            new Response(Readable.toWeb(body) as ReadableStream, {
              headers: responseHeaders,
              status: statusCode
            })
          )
          pipe(body)
        },
        onShellError: reject,
        onError(error) {
          statusCode = 500
          console.error(error)
        }
      }
    )

    setTimeout(abort, streamTimeout + 1000)
  })

export default handleRequest
