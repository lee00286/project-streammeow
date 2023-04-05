import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import module from "../../ApiService";
import Alert from "../Alert/Alert";
import "./HomePage.css";

/**
 * Home page component.
 * @returns Home page component
 */
function HomePage() {
  const navigate = useNavigate();

  const [Creators, setCreators] = useState([]);
  const [ErrorLog, setErrorLog] = useState("");

  useEffect(() => {
    module
      .getAllCreators()
      .then((res) => {
        if (res.error) return setErrorLog(res.error);
        setCreators(res.data.creators);
      })
      .catch(
        (e) => e.response?.data?.error && setErrorLog(e.response.data.error)
      );
  }, []);

  // Navigate to creators
  const moreCreators = () => {
    navigate("/allcreators");
  };

  // Navigate to live streams
  const moreStreams = () => {
    navigate("/streaming");
  };

  // Navigate to videos
  const moreVideos = () => {
    navigate("/allposted");
  };

  const creatorList =
    Creators && Creators !== [] && Creators.length > 0 ? (
      Creators.map((creator, index) => {
        const onCreator = () => {
          navigate(`/creators/${creator.id}`);
        };

        return (
          <div
            key={`creator-${index}`}
            className="creator col-1"
            onClick={onCreator}
          >
            <div className="image-container">
              <img
                className="creator-img"
                src="samples/tintin@2x.png"
                // src={`/api/users/${creator.userId}/picture`}
              />
            </div>
            <div className="creator-name">
              <p>{`Creator-${creator.id}`}</p>
            </div>
          </div>
        );
      })
    ) : (
      <div>No Creators</div>
    );

  return (
    <div className="home-page page col">
      <Alert text={ErrorLog} isError={true} hide={ErrorLog === ""} />
      <div className="creators-container col">
        <div className="title-container row">
          <div className="title col-10">
            <p>CREATORS</p>
          </div>
          <div className="more col-2" onClick={moreCreators}>
            <p>more</p>
          </div>
        </div>
        <div className="creator-container row">{creatorList}</div>
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
