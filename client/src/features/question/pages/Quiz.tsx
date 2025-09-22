import type { FunctionComponent } from "react"
import type { YouTubeProps } from "react-youtube"
import YouTube from "react-youtube"

type QuizPageProps = {}

const QuizPage: FunctionComponent<QuizPageProps> = () => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  const opts: YouTubeProps["opts"] = {
    height: "360",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header - Fixed at top */}
      <div className="px-4 py-5 flex justify-between items-center flex-shrink-0">
        <div></div>
        <button className="px-4 py-2 bg-gray-100 rounded-lg text-center">
          <span className="text-base text-gray-900 font-bold">Tips and Tricks</span>
        </button>
        <button className="p-3 rounded-lg hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress indicator - Fixed below header */}
      <div className="flex justify-end px-4 py-4 flex-shrink-0">
        <div className="flex gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg">
          <span>Total:</span>
          <span className="text-gray-900">1/2</span>
          <span className="text-gray-900 font-bold">00:24:42</span>
        </div>
      </div>

      {/* Main content - Added flex-1 and overflow-y-auto for scrollable content area */}
      <div className="flex-1 px-4 overflow-y-auto">
        <div className="max-w-6xl mx-auto pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Video section */}
            <div className="space-y-4">
              <h1 className="text-2xl lg:text-3xl text-gray-900 font-bold leading-tight">
                Watch the video till 8:50 and answer the questions
              </h1>
              <div className="aspect-video w-full">
                <YouTube
                  videoId="d2B13zqKL1I"
                  opts={{
                    ...opts,
                    width: "100%",
                    height: "100%",
                  }}
                  onReady={onPlayerReady}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Questions section */}
            <div>
              <form className="space-y-6">
                {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-3 font-medium text-gray-900">
                      {num}. Stephanie would be unhappy to stretch her budget.
                    </div>
                    <div className="space-y-2 pl-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name={`question-${num}`} value="true" className="text-blue-600" />
                        <span>True</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name={`question-${num}`} value="false" className="text-blue-600" />
                        <span>False</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name={`question-${num}`} value="not-given" className="text-blue-600" />
                        <span>Not Given</span>
                      </label>
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom using flex-shrink-0 instead of position fixed */}
      <div className="bg-white px-4 py-3 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="bg-red-500 text-white px-4 py-2 rounded-full font-medium">15:05</div>
          <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Next ≫
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
