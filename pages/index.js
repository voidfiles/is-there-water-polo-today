/* This example requires Tailwind CSS v2.0+ */
import * as fs from "fs/promises";
import { DateTime } from "luxon";
import Image from "next/image";
import * as _ from "lodash";
import { ChartBarIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useState } from "react";
import OurHead from "../components/OurHead";
import { Yes, No } from "../components/Alerts";
import OurNav from "../components/OurNav";
import Selector from "../components/Selector";
import Script from "next/script";
// import Dropdown from "../components/Dropdown";

function sortDataGivenState({ data, sortState }) {
  _.toPairs(sortState).forEach(([key, val]) => {
    if (_.isUndefined(val)) {
      return;
    }

    data = _.sortBy(data, [key]);
    if (val === "dsc") {
      data = _.reverse(data);
    }
  });
  return data;
}

function Video({ link }) {
  if (!link) {
    return <></>;
  }

  return (
    <a className="inline" href={link} title="Video">
      <VideoCameraIcon className="inline h-5 w-5" />
    </a>
  );
}

function Stats({ link }) {
  if (!link) {
    return <></>;
  }

  return (
    <a className="inline" href={link} title="Stats">
      <ChartBarIcon className="inline h-5 w-5" />
    </a>
  );
}

function GamesTH({ hideMobile = false, children }) {
  let classes =
    "px-3 py-1 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  classes += hideMobile ? "hidden md:table-cell" : "";
  return (
    <th scope="col" className={classes}>
      {children}
    </th>
  );
}

function GamesTd({ hideMobile = false, bold = false, children }) {
  let classes = " px-3 py-1 md:px-6 md:py-3 whitespace-nowrap text-sm ";
  classes += bold ? " text-gray-900 " : " text-gray-500 ";
  classes += hideMobile ? " hidden md:table-cell " : "";
  return <td className={classes}>{children}</td>;
}

// <!-- Date PST MST CST EST Conference Location Game Dark White D Score W Score Video Stats -->
export default function Home({ games }) {
  const [sortState, setSortState] = useState({
    Date: "asc",
  });
  let gameToday = false;
  const today = DateTime.now().toISODate();
  games.map((g) => {
    if (g.PreDate == today) {
      gameToday = true;
    }
  });

  games = sortDataGivenState({ sortState, data: games });

  function bindCallback(prop) {
    return function (val) {
      const newState = {};
      newState[prop] = val;
      setSortState({ ...sortState, ...newState });
    };
  }

  const alert = gameToday ? Yes() : No();

  return (
    <>
      <OurHead />
      <div className="min-h-full">
        <OurNav />
        <div className="py-10">{alert}</div>
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Games
              </h1>
              <span>*All times are local too you!</span>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="table-auto min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <GamesTH>
                              <Selector
                                state={sortState.Date}
                                cb={bindCallback("Date")}
                              />
                              <span>Date</span>
                            </GamesTH>
                            <GamesTH>
                              <Selector
                                state={sortState.Conference}
                                cb={bindCallback("Conference")}
                              />
                              <span>Conf</span>
                            </GamesTH>
                            <GamesTH>Game</GamesTH>
                            <GamesTH>Scores</GamesTH>
                            <GamesTH>Links</GamesTH>
                          </tr>
                        </thead>
                        <tbody>
                          {games.map((game, personIdx) => (
                            <tr
                              key={game.Date + game.Dark + game.White}
                              className={
                                personIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <GamesTd bold={true}>
                                <div className="text-sm text-gray-900">
                                  {DateTime.fromISO(game.Date)
                                    .toLocal()
                                    .toFormat("hh:mm a")}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {DateTime.fromISO(game.Date)
                                    .toLocal()
                                    .toFormat("EEE d/L")}
                                </div>
                              </GamesTd>
                              <GamesTd>
                                <div className="text-sm text-gray-900">
                                  <a
                                    href={game.TournamentLink}
                                    title={game.Conference + " Conference"}
                                  >
                                    {game.Conference}
                                  </a>
                                </div>
                                <div
                                  className="text-sm text-gray-500"
                                  title="Location"
                                >
                                  {game.Location}
                                </div>
                              </GamesTd>
                              <GamesTd>
                                <div className="flex items-center">
                                  <div className="flex-initial pr-5">
                                    {game.Game}
                                  </div>
                                  <div className="flex-initial">
                                    <div className="text-sm text-gray-900">
                                      {game.Dark} vs.
                                    </div>
                                    <div className="text-sm text-gray-900">
                                      {game.White}
                                    </div>
                                  </div>
                                </div>
                              </GamesTd>
                              <GamesTd>
                                <div className="flex items-center">
                                  <div className="flex-initial">
                                    <div
                                      className={
                                        "text-sm text-gray-900" +
                                        (game.DScore > game.WScore
                                          ? " font-bold "
                                          : "")
                                      }
                                    >
                                      {game.DScore}
                                    </div>
                                    <div
                                      className={
                                        "text-sm text-gray-900" +
                                        (game.WScore > game.DScore
                                          ? " font-bold "
                                          : "")
                                      }
                                    >
                                      {game.WScore}
                                    </div>
                                  </div>
                                </div>
                              </GamesTd>
                              <GamesTd>
                                <Stats link={game.Stats} />
                                <Video link={game.Video} />
                              </GamesTd>
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
      <Script
        strategy="afterInteractive"
        data-cf-beacon='{"token": "dc9183398bf04e229ea9bbd830ed47eb"}'
        src="https://static.cloudflareinsights.com/beacon.min.js"
      />
    </>
  );
}

export async function getStaticProps(context) {
  const rawData = await fs.readFile("./public/waterpolo.json");

  const games = JSON.parse(rawData.toString()).map((d) => {
    const parsedDate = DateTime.fromISO(d.Date, { zone: "UTC-8" });
    d.Date = parsedDate.toISO();
    d.PreDate = parsedDate.toISODate();
    return d;
  });

  if (!games) {
    return {
      notFound: true,
    };
  }

  return {
    props: { games }, // will be passed to the page component as props
  };
}
