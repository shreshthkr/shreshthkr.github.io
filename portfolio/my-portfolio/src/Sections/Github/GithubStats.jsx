import React from 'react'
import "./GithubStats.css";
import GitHubCalendar from "react-github-calendar";
const GithubStats = () => {
    
  return (
    <>
      <div id='github'>
      <div id="github-heading">
            <h1>Github <span>Submissions</span></h1>
        </div>
        <div className="Github-calendar">
        <h1 className="Calendar">GitHub Calendar</h1>

        <GitHubCalendar
          username="shreshthkr"
          blockSize={15}
          blockMargin={5}
          fontSize={18}
          margin="auto"
        />
      </div>
      <div id="stats-heading">
            <h1>Github <span>Stats</span></h1>
        </div>
        <div className="github-streaks">
          <div id="github-streak-stats-div">
            <img
              id="github-streak-stats"
              src="https://github-readme-streak-stats.herokuapp.com/?user=shreshthkr&theme=radical"
              alt="github streak"
            />
          </div>
          <div id="github-stats-card-div">
            <img
              id="github-stats-card"
              src="https://github-readme-stats.vercel.app/api?username=shreshthkr&show_icons=true&theme=radical"
              alt="stats"
            />
          </div>
        </div>
        <div id="github-top-langs-div">
          <img
            id="github-top-langs"
            src="https://github-readme-stats.vercel.app/api/top-langs?username=shreshthkr&show_icons=true&locale=en&layout=compact"
            alt="Most used lang"
          />
        </div>
      </div>
      
    </>
  )
}

export default GithubStats;
