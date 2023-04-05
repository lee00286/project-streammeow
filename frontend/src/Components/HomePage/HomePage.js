import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import React from "react";

/**
 * Home page component.
 * @returns Home page component
 */
function HomePage() {
  const navigate = useNavigate();

  // Navigate to creators
  const moreCreators = () => {
    navigate("/allcreators");
  };

  // Navigate to live streams
  const moreStreams = () => {
    navigate("/allstreams");
  };

  // Navigate to videos
  const moreVideos = () => {
    navigate("/allposted");
  };

  return (
    <div className="home-page page col">
      <div className="creators-container col">
        <div className="title-container row">
          <div className="title col-10">
            <p>CREATORS</p>
          </div>
          <div className="more col-2" onClick={moreCreators}>
            <p>more</p>
          </div>
        </div>
        <div className="creator-container row">
          <div className="creator col-1">
            <div className="image-container">
              <img
                className="creator-img"
                src="samples/tintin@2x.png"
                alt="tintin"
              />
            </div>
            <div className="creator-name">
              <p>Tin tin</p>
            </div>
          </div>
          <div className="creator col-1">
            <div className="image-container">
              <img
                className="creator-img"
                src="samples/tintin@2x.png"
                alt="tintin"
              />
            </div>
            <div className="creator-name">
              <p>Tin tin</p>
            </div>
          </div>
          <div className="creator col-1">
            <div className="image-container">
              <img
                className="creator-img"
                src="samples/tintin@2x.png"
                alt="tintin"
              />
            </div>
            <div className="creator-name">
              <p>Tin tin</p>
            </div>
          </div>
          <div className="creator col-1">
            <div className="image-container">
              <img
                className="creator-img"
                src="samples/tintin@2x.png"
                alt="tintin"
              />
            </div>
            <div className="creator-name">
              <p>Tin tin</p>
            </div>
          </div>
          <div className="creator col-1">
            <div className="image-container">
              <img
                className="creator-img"
                src="samples/tintin@2x.png"
                alt="tintin"
              />
            </div>
            <div className="creator-name">
              <p>Tin tin</p>
            </div>
          </div>
          <div className="creator col-1">
            <div className="image-container">
              <img
                className="creator-img"
                src="samples/tintin@2x.png"
                alt="tintin"
              />
            </div>
            <div className="creator-name">
              <p>Tin tin</p>
            </div>
          </div>
          <div className="creator col-1">
            <div className="image-container">
              <img
                className="creator-img"
                src="samples/tintin@2x.png"
                alt="tintin"
              />
            </div>
            <div className="creator-name">
              <p>Tin tin</p>
            </div>
          </div>
          <div className="creator col-1">
            <div className="image-container">
              <img
                className="creator-img"
                src="samples/tintin@2x.png"
                alt="tintin"
              />
            </div>
            <div className="creator-name">
              <p>Tin tin</p>
            </div>
          </div>
        </div>
      </div>
      <div className="live-container col">
        <div className="title-container row">
          <div className="title col-10">
            <p>ON STREAM</p>
          </div>
          <div className="more col-2" onClick={moreStreams}>
            <p>more</p>
          </div>
        </div>
        <div className="video-container col">
          <div className="video-row1 row">
            <div className="video-wrapper col-3">
              <div className="video-image">
                <div className="live-tag"></div>
                <img
                  className="video-img"
                  src="samples/IMG_2564.webp"
                  alt="video"
                />
              </div>
              <div className="video-info row">
                <div className="author col-2">
                  <img
                    className="author-img"
                    src="samples/tintin@2x.png"
                    alt="author"
                  />
                </div>
                <div className="video-title col-10">
                  <div className="title-name">video title</div>
                  <div className="author-name">author name</div>
                </div>
              </div>
            </div>
            <div className="video-wrapper col-3">
              <div className="video-image">
                <div className="live-tag"></div>
                <img
                  className="video-img"
                  src="samples/IMG_2564.webp"
                  alt="video"
                />
              </div>
              <div className="video-info row">
                <div className="author col-2">
                  <img
                    className="author-img"
                    src="samples/tintin@2x.png"
                    alt="author"
                  />
                </div>
                <div className="video-title col-10">
                  <div className="title-name">video title</div>
                  <div className="author-name">author name</div>
                </div>
              </div>
            </div>
            <div className="video-wrapper col-3">
              <div className="video-image">
                <div className="live-tag"></div>
                <img
                  className="video-img"
                  src="samples/IMG_2564.webp"
                  alt="video"
                />
              </div>
              <div className="video-info row">
                <div className="author col-2">
                  <img
                    className="author-img"
                    src="samples/tintin@2x.png"
                    alt="author"
                  />
                </div>
                <div className="video-title col-10">
                  <div className="title-name">video title</div>
                  <div className="author-name">author name</div>
                </div>
              </div>
            </div>
            <div className="video-wrapper col-3">
              <div className="video-image">
                <div className="live-tag"></div>
                <img
                  className="video-img"
                  src="samples/IMG_2564.webp"
                  alt="video"
                />
              </div>
              <div className="video-info row">
                <div className="author col-2">
                  <img
                    className="author-img"
                    src="samples/tintin@2x.png"
                    alt="author"
                  />
                </div>
                <div className="video-title col-10">
                  <div className="title-name">video title</div>
                  <div className="author-name">author name</div>
                </div>
              </div>
            </div>
          </div>
          <div className="video-row2 row">
            <div className="video-wrapper col-3">
              <div className="video-image">
                <div className="live-tag"></div>
                <img
                  className="video-img"
                  src="samples/IMG_2564.webp"
                  alt="video"
                />
              </div>
              <div className="video-info row">
                <div className="author col-2">
                  <img
                    className="author-img"
                    src="samples/tintin@2x.png"
                    alt="author"
                  />
                </div>
                <div className="video-title col-10">
                  <div className="title-name">video title</div>
                  <div className="author-name">author name</div>
                </div>
              </div>
            </div>
            <div className="video-wrapper col-3">
              <div className="video-image">
                <div className="live-tag"></div>
                <img
                  className="video-img"
                  src="samples/IMG_2564.webp"
                  alt="video"
                />
              </div>
              <div className="video-info row">
                <div className="author col-2">
                  <img
                    className="author-img"
                    src="samples/tintin@2x.png"
                    alt="author"
                  />
                </div>
                <div className="video-title col-10">
                  <div className="title-name">video title</div>
                  <div className="author-name">author name</div>
                </div>
              </div>
            </div>
            <div className="video-wrapper col-3">
              <div className="video-image">
                <div className="live-tag"></div>
                <img
                  className="video-img"
                  src="samples/IMG_2564.webp"
                  alt="video"
                />
              </div>
              <div className="video-info row">
                <div className="author col-2">
                  <img
                    className="author-img"
                    src="samples/tintin@2x.png"
                    alt="author"
                  />
                </div>
                <div className="video-title col-10">
                  <div className="title-name">video title</div>
                  <div className="author-name">author name</div>
                </div>
              </div>
            </div>
            <div className="video-wrapper col-3">
              <div className="video-image">
                <div className="live-tag"></div>
                <img
                  className="video-img"
                  src="samples/IMG_2564.webp"
                  alt="video"
                />
              </div>
              <div className="video-info row">
                <div className="author col-2">
                  <img
                    className="author-img"
                    src="samples/tintin@2x.png"
                    alt="author"
                  />
                </div>
                <div className="video-title col-10">
                  <div className="title-name">video title</div>
                  <div className="author-name">author name</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="posted-container col">
        <div className="title-container row">
          <div className="title col-10">
            <p>VIDEOS</p>
          </div>
          <div className="more col-2" onClick={moreVideos}>
            <p>more</p>
          </div>
        </div>
        <div className="video-container row">
          <div className="video-row3 row">
            <div className="video-wrapper col-3">
              <div className="video-image">
                <div className="length-tag">10:00</div>
                <img
                  className="video-img"
                  src="samples/IMG_2564.webp"
                  alt="video"
                />
              </div>
              <div className="video-info row">
                <div className="author col-2">
                  <img
                    className="author-img"
                    src="samples/tintin@2x.png"
                    alt="author"
                  />
                </div>
                <div className="video-title col-10">
                  <div className="title-name">video title</div>
                  <div className="author-name">author name</div>
                </div>
              </div>
            </div>
            <div className="video-wrapper col-3">
              <div className="video-image">
                <div className="length-tag">10:00</div>
                <img
                  className="video-img"
                  src="samples/IMG_2564.webp"
                  alt="video"
                />
              </div>
              <div className="video-info row">
                <div className="author col-2">
                  <img
                    className="author-img"
                    src="samples/tintin@2x.png"
                    alt="author"
                  />
                </div>
                <div className="video-title col-10">
                  <div className="title-name">video title</div>
                  <div className="author-name">author name</div>
                </div>
              </div>
            </div>
            <div className="video-wrapper col-3">
              <div className="video-image">
                <div className="length-tag">10:00</div>
                <img
                  className="video-img"
                  src="samples/IMG_2564.webp"
                  alt="video"
                />
              </div>
              <div className="video-info row">
                <div className="author col-2">
                  <img
                    className="author-img"
                    src="samples/tintin@2x.png"
                    alt="author"
                  />
                </div>
                <div className="video-title col-10">
                  <div className="title-name">video title</div>
                  <div className="author-name">author name</div>
                </div>
              </div>
            </div>
            <div className="video-wrapper col-3">
              <div className="video-image">
                <div className="length-tag">10:00</div>
                <img
                  className="video-img"
                  src="samples/IMG_2564.webp"
                  alt="video"
                />
              </div>
              <div className="video-info row">
                <div className="author col-2">
                  <img
                    className="author-img"
                    src="samples/tintin@2x.png"
                    alt="author"
                  />
                </div>
                <div className="video-title col-10">
                  <div className="title-name">video title</div>
                  <div className="author-name">author name</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
