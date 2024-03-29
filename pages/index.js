import Image from 'next/image';
import Link from 'next/link';

const actions = [
  {
    title: 'GIF Maker',
    href: '/gif',
    content:
      'Convert any type of video into GIF. You can choose what part of the video you want to convert.',
    iconUrl: '/gif-icon.svg',
  },
  {
    title: 'Audio Extractor',
    href: '/audio',
    content:
      'Extract all audio from a video. The output audio is in mp3 format.',
    iconUrl: '/mp3-icon.svg',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  return (
    <div className="h-full px-6 flex flex-col items-center justify-center lg:px-0">
      <div className="max-w-2xl rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0
                ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                : '',
              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
              actionIdx === actions.length - 1
                ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                : '',
              'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
            )}
          >
            <div>
              <Image
                width="64px"
                height="64px"
                src={action.iconUrl}
                alt={action.title}
              ></Image>
            </div>
            <div className="mt-8">
              <Link href={action.href} passHref>
                <h3 className="text-2xl font-medium text-black cursor-pointer">
                  <a className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    {action.title}
                  </a>
                </h3>
              </Link>
              <p className="mt-2 text-sm text-gray-500">{action.content}</p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
