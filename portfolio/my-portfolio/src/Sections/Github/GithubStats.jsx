import React from "react";
import "./GithubStats.css";
import GitHubCalendar from "react-github-calendar";
import Reveal from "../../Components/Reveal";
import { HiArrowUpRight } from "react-icons/hi2";

const GithubStats = () => {
  return (
    <section id="github" className="section section--light gh">
      <div className="inner">
        <div className="gh__top">
          <div className="gh__intro">
            <Reveal>
              <span className="eyebrow">Activity</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">
                Building <span className="muted">in public</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="gh__lead">
                A steady cadence of commits — shipping, refining and learning in
                the open.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <a
              className="gh__profile"
              href="https://github.com/shreshthkr"
              target="_blank"
              rel="noopener noreferrer"
            >
              @shreshthkr <HiArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="gh__panel">
          <span className="gh__panel-label">Contribution Graph · Last 12 months</span>
          <div className="gh__calendar-wrap">
            <GitHubCalendar
              username="shreshthkr"
              blockSize={13}
              blockMargin={4}
              fontSize={13}
              colorScheme="dark"
              theme={{
                dark: ["#12212a", "#164554", "#1b7889", "#38afbd", "#8ceef7"],
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default GithubStats;
