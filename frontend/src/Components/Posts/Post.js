import React from "react";
import "./Post.css";

/**
 * A simple text post component that can be liked/disliked.
 * @param {boolean} locked true if the user doesn't have privledge to view the post
 * @param {string} lockedReason explains why the user can't view this post. only relevant when locked=true
 * @param {string} title title of the post
 * @param {string} description description. ignored if locked
 * @param {number} likes number of likes. ignored if locked
 * @param {number} dislikes number of dislikes. ignored if locked
 * @param {Function} onLike function for liking/disliking a post
 * @returns Text Post Component
 */
export default function Post({
  locked,
  lockedReason,
  title,
  description,
  likes,
  dislikes,
  onLike,
}) {
  let content = locked
    ? createLockedPost(lockedReason, title)
    : createPost(title, description, likes, dislikes, onLike);
  return content;
}

function createPost(title, description, likes, dislikes, likeFunction) {
  const onLike = (like) => {
    if (!likeFunction) return;
    // If liked, true, otherwise, false
    likeFunction(like);
  };

  return (
    <div className="post col rounded shadow">
      <div className="post-header">
        <p className="post-title">{title}</p>
      </div>
      <div className="post-content">
        <p className="post-description">{description}</p>
      </div>
      <div className="post-footer row">
        {/* TODO add a visual difference for what was pressed already */}
        <button
          type="button"
          className="post-button icon-like"
          onClick={() => onLike(true)}
        />
        <p>{likes}</p>
        <button
          type="button"
          className="post-button icon-dislike"
          onClick={() => onLike(false)}
        />
        <p>{dislikes}</p>
      </div>
    </div>
  );
}

// todo: make it look better
function createLockedPost(lockedReason, title) {
  return (
    <div className="post rounded shadow">
      <p className="post-title">{title}</p>
      <div className="post-locked-content">
        <div className="lock icon-lock" />
        <p>{lockedReason}</p>
      </div>
    </div>
  );
}
