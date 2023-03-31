import React from "react";

import "./Post.css";
// TODO: author can be redundant on a creator's page but useful if viewing
// posts from other creators on a different page, say the home page
// so support hiding or showing the author

// TODO: full view
/**
 * For now, a simple text post that can be liked/disliked.
 *
 * @param {boolean} preview show a condensed view of the post (a preview) or show the full details
 * @param {boolean} isPublic whether the post is visible to anyone or requires a membership
 * @param {boolean} locked true if the user doesn't have privledge to view the post
 * @param {string} lockedReason explains why the user can't view this post. only relevant when locked=true
 * @param {Object} author the author of this post. if undefined, don't render the author UI
 * @param {string} author.id id of who wrote the post
 * @param {string} author.name name of who wrote the post
 * @param {string} title title of the post
 * @param {string} description description. ignored if locked
 * @param {number} likes number of likes. ignored if locked
 * @param {number} dislikes number of dislikes. ignored if locked
 * @param {number} comments.total total comments in this post. ignored if locked
 * @param {Object[]} comments.data TODO the list of comments. ignored if locked
 * @returns
 */
export default function Post({
  preview,
  isPublic,
  locked,
  lockedReason,
  author,
  title,
  description,
  likes,
  dislikes,
  comments,
}) {
  let content;
  if (!locked) {
    content = createPost(
      preview,
      isPublic,
      author,
      title,
      description,
      likes,
      dislikes,
      comments
    );
  } else {
    content = createLockedPost(preview, lockedReason, author, title);
  }

  return content;
}

function createPost(
  preview,
  isPublic,
  author,
  title,
  description,
  likes,
  dislikes,
  comments
) {
  return (
    <div className="post rounded shadow">
      <div className="post-header">
        <p className="post-title">{title}</p>
        {/* TODO: add link to author page and an optional profile pic */}
        {author && <p className="post-author">{author.name}</p>}
      </div>
      <div className="post-content">
        <p className="post-description">{description}</p>
      </div>
      <div className="post-footer">
        <div className="post-footer-left">
          <p>
            {comments.total === 0 ? "No" : comments.total} Comment
            {comments.total !== 1 && "s"}{" "}
          </p>
        </div>
        <div className="post-footer-right">
          {/* TODO add a visual difference for what was pressed already */}
          <button type="button" className="post-button icon-like" />
          <p>{likes}</p>
          <button type="button" className="post-button icon-dislike" />
          <p>{dislikes}</p>
        </div>
      </div>
    </div>
  );
}

// todo: make it look better
function createLockedPost(preview, lockedReason, author, title) {
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
