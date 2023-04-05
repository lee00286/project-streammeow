"use strict";

import React, { useState, useEffect, StrictMode } from "react";
import { useNavigate, useParams } from "react-router-dom";

import module from "../../ApiService";
import PageTitle from "../Texts/PageTitle";
import SubTitle from "../Texts/SubTitle";
import Membership from "../Membership/Membership";
import Post from "../Posts/Post";
import Alert from "../Alert/Alert";
import "./CreatorPage.css";

export default function CreatorPage() {
  const { creatorId } = useParams();

  const [User, setUser] = useState(null);
  const [Permission, setPermission] = useState(null);
  const [Posts, setPosts] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [ErrorLog, setErrorLog] = useState("");

  useEffect(() => {
    // If user already loaded
    if (User !== null) return;
    // Get user information
    module.getUserId().then((res) => {
      if (res.data.user === undefined) return setErrorLog("User not found.");
      setUser(res.data.user);
      module.getCreatorByUserId(res.data.user.id).then((res) => {
        if (res.error) return setErrorLog(res.error);
        // If user is owner of the page
        if (`${res.data.creator.id}` === creatorId) setPermission(-1);
      });
    });
  }, []);

  // retrieve data for the creator page
  useEffect(() => {
    if (!creatorId || !User) return;
    // From Fetching data with Effects in the useEffects React docs
    // Used to prevent a race condition when multiple requests are made
    let ignore = false;
    setMemberships([]);
    module
      .getAllMemberships(creatorId)
      .then((res) => {
        if (!ignore) {
          if (res.error) return setErrorLog(res.error);
          const memberships = res.data.memberships;
          setMemberships(memberships);
          // Get user permisison level
          const subscriptions = User.subscription;
          if (Permission !== null) return;
          if (
            !memberships ||
            memberships === [] ||
            memberships.length === 0 ||
            !subscriptions ||
            subscriptions === [] ||
            subscriptions.length === 0
          )
            return;
          for (let i = 0; i < memberships.length; i++) {
            if (subscriptions.includes(`${memberships[i].id}`)) {
              return setPermission(memberships[i].id);
            }
          }
        }
      })
      .catch(
        (e) => e.response?.data?.error && setErrorLog(e.response.data.error)
      );
    return () => {
      ignore = true;
    };
  }, [creatorId, User]);

  useEffect(() => {
    // From Fetching data with Effects in the useEffects React docs
    // Used to prevent a race condition when multiple requests are made
    let ignore = false;
    if (!creatorId || !User) return;
    module
      .getAllPosts(creatorId, Permission)
      .then((res) => {
        if (!ignore) {
          if (res.error) return setErrorLog(res.error);
          setPosts(res.data.posts);
          console.log(res.data.posts);
        }
      })
      .catch(
        (e) => e.response?.data?.error && setErrorLog(e.response.data.error)
      );
    return () => {
      ignore = true;
    };
  }, [creatorId, User]);

  // TODO: consider what behaviour to do with medium, small, xs screen widths
  // TODO: make memberships horizontally scrollable or add next/prev arrows when
  // more memberships than the screen width (probably more than 3)
  const navigate = useNavigate();

  const goToPurchase = (id) => {
    navigate(`/purchase/${creatorId}`, { state: { membershipId: id } });
  };

  const postComponents = Posts.map((post) => {
    let permission = [];
    console.log(post);
    if (post.permission) {
      for (let i = 0; i < post.permission.length; post.permission++) {
        const index = memberships.findIndex((m) => m.id === post.permission[i]);
        permission.push(memberships[index]);
      }
    }

    const options = {
      permission: permission,
      locked:
        post.permission !== null &&
        post.permission !== [] &&
        post.permission.length > 0 &&
        !post.permission.includes(Permission),
      title: post.title,
    };

    console.log(options);

    const onLike = (like) => {
      let action = like ? "like" : "dislike";
      module
        .likePost(post.id, action)
        .then((res) => {
          if (res.error) return setErrorLog(res.error);
        })
        .catch(
          (e) => e.response?.data?.error && setErrorLog(e.response.data.error)
        );
    };

    // show content if the user can view it
    if (!post.locked) {
      options.description = post.description;
      options.likes = post.likes;
      options.dislikes = post.dislikes;
      options.comments = post.comments;
    } else {
      options.lockedReason = `You need to be at least a ${permission[0].name} member to view this post.`;
    }

    return <Post key={`post-${post.id}`} onLike={onLike} {...options} />;
  });

  return (
    <StrictMode>
      <div className="page center">
        <Alert text={ErrorLog} isError={true} hide={ErrorLog === ""} />
        <PageTitle text="Creator" />
        <div className="creator-page row">
          <div className="col-6">
            <SubTitle text="Posts" />
            <div className="posts-container col">
              {Posts && Posts !== [] && Posts.length > 0 ? (
                postComponents
              ) : (
                <div>Empty Post</div>
              )}
            </div>
          </div>
          <div className="col-auto">
            <SubTitle text="Memberships" />
            <div className="memberships-container row">
              {memberships.map((membership) => {
                return (
                  <Membership
                    key={`membership-${membership.id}`}
                    {...membership}
                    onSelectMembership={goToPurchase}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </StrictMode>
  );
}
