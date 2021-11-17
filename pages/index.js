/* This example requires Tailwind CSS v2.0+ */
import * as fs from "fs/promises";
import { Disclosure } from '@headlessui/react'
import Image from 'next/image'
import { flexShrink } from 'tailwindcss/defaultTheme';

/* This example requires Tailwind CSS v2.0+ */
const people = [
  { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
  { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
  // More people...
]

// <!-- Date	PST	MST	CST	EST	Conference	Location	Game	Dark	White	D Score	W Score	Video	Stats -->
export default function Home({data}) {
  return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
        <div className="min-h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <div className="block lg:hidden h-8 w-auto">
                    <Image  src="/waterpolo.png" alt="Water Polo" width="32" height="32" />
                  </div>
                  <div className="hidden lg:block h-8 w-auto">
                    <Image  src="/waterpolo.png" alt="Water Polo" width="32" height="32" />
                  </div>
                  <span>Is there water polo today?</span>
                </div>
              </div>
            </div>
          </div>
  
          <div className="py-10">
            <header>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
              </div>
            </header>
            <main>
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Conference
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Dark
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    White
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((game, personIdx) => (
                  <tr key={game.Dark + game.White} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{game.Date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.Conference}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.Location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.Dark}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.White}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
              </div>
            </main>
          </div>
        </div>
      </>
    )
}

export async function getStaticProps(context) {
  
  const rawData = await fs.readFile("./public/waterpolo.json");
  const data = JSON.parse(rawData.toString());

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}