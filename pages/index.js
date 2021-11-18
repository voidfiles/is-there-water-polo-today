/* This example requires Tailwind CSS v2.0+ */
import * as fs from "fs/promises";
import { DateTime } from "luxon";
import Image from 'next/image'
import * as _ from 'lodash';

import { ChartBarIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, SelectorIcon, VideoCameraIcon, XCircleIcon } from '@heroicons/react/solid'
import { useState } from "react";

function Yes() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="h-20 w-20 text-green-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-5xl font-medium text-green-800">Yes!</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>There are games today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

function No() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-20 w-20 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-5xl font-medium text-red-800">No!</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>But, there might be upcomming games!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

function Selector({state, cb}) {
  const classData = "inline h-5 w-5 cursor-pointer";

  console.log("Rendering a selector ", state);
  if (state === "asc") {
    return (
      <ChevronDownIcon className={classData} onClick={() => cb('dsc') } />
    );
  }

  if (state === "dsc") {
    return (
      <ChevronUpIcon className={classData} onClick={() => cb(undefined) } />
    );
  }

  return (
    <SelectorIcon className={classData} onClick={() => cb('asc') } />
  );

}

function sortDataGivenState({data, sortState}) {
  console.log("Data b", data[0]);
  _.toPairs(sortState).forEach(([key, val]) => {
    if (_.isUndefined(val)) {
      return;
    }

    data = _.sortBy(data, [key]);
    if (val === "dsc") {
      data = _.reverse(data);
    }
  });
  console.log("Data c", data[0]);
  return data;
};

function Video({link}) {
  if (!link) {
    return (<></>);
  }

  return (
    <a href={link}>
      <VideoCameraIcon title="Video" className="h-5 w-5" />
    </a>
  );
};

function Stats({link}) {
  if (!link) {
    return (<></>);
  }

  return (
    <a href={link} title="Stats">
      <ChartBarIcon className="h-5 w-5" />
    </a>
  );
};

// <!-- Date PST MST CST EST Conference Location Game Dark White D Score W Score Video Stats -->
export default function Home({games}) {
  const [sortState, setSortState] = useState({
    "Date": "asc",
  });
  let gameToday = false;
  const today = DateTime.now().toFormat("DATE_SHORT");
  games.map((g) => {
    if(g.PreDate == today) {
      gameToday = true;
    }
  });

  games = sortDataGivenState({sortState, data: games});

  function bindCallback(prop) {
    return function (val) {
      console.log("Yo yo", prop, val);
      const newState = {};
      newState[prop] = val;
      setSortState({...sortState, ...newState});
    };
  }
  

  const alert = (gameToday) ? Yes() : No();

  return (
      <>
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
            {alert}
          </div>
          <div className="py-10">
            <header>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold leading-tight text-gray-900">Upcomming Games</h1>
                <span>*All times are local too you!</span>
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
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex"
                              >
                                <Selector state={ sortState.Date } cb={ bindCallback('Date') } />
                                <span>Date</span>
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                <Selector state={ sortState.Conference } cb={ bindCallback('Conference') } />
                                <span>Conf</span>
                              </th>
                              <th
                                scope="col"
                                className="px-6 hidden md:table-cell py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Location
                              </th>
                              <th
                                scope="col"
                                className="px-6 hidden md:table-cell py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Game
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
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Links
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {games.map((game, personIdx) => (
                              <tr key={game.Date + game.Dark + game.White} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{DateTime.fromISO(game.Date).toLocal().toFormat('EEE d/L H:mm a')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <a href={game.TournamentLink}>
                                    {game.Conference}
                                  </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{game.Location}</td>
                                <td className="px-6  hidden md:table-cell py-4 whitespace-nowrap text-sm text-gray-500">{game.Game}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.Dark}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.White}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex">
                                  <Video link={game.Video} />
                                  <Stats link={game.Stats} />
                                </td>
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

  const games = JSON.parse(rawData.toString()).map((d) => {
    const parsedDate = DateTime.fromISO(d.Date, {zone: "PST"});
    d.Date = parsedDate.toISO();
    d.PreDate = parsedDate.toFormat("DATE_SHORT");
    return d;
  })

  if (!games) {
    return {
      notFound: true,
    }
  }

  return {
    props: { games }, // will be passed to the page component as props
  }
}