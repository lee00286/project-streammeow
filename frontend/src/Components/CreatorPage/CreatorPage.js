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

// placeholder post data till API is decided
const posts = [
  {
    id: "1",
    // whether this post can be seen by anyone or requires a membership
    isPublic: true,
    // whether the user can view this post or not
    viewable: true,
    // author and title are always visible
    // who wrote the post
    author: {
      id: "1",
      name: "Creator",
      // todo add profile picture
    },
    title: "My first post!",
    // if the user can view the post, the properties description, likes, dislikes, comments are present
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
    likes: 10,
    dislikes: 2,
    // todo decide comments data
    comments: {
      total: 0,
      data: [], // todo
    },
  },
  // basic membership only post, but user can view because he has basic member
  {
    id: "2",
    isPublic: false,
    // to keep things simple, creators can only specify the cheapest membership
    // that can view the post
    required: {
      id: "1",
      name: "Basic",
    },
    viewable: true,
    // author: {
    //   id: "1",
    //   name: "Creator",
    // },
    title: "A members only post",
    description:
      "Hello everyone! I just wanted to say thank you for supporting me through these tough times.",
    likes: 5,
    dislikes: 10,
    comments: {
      total: 100,
      data: [],
    },
  },
  // standard membership only post. user can't view since only Basic member
  {
    id: "3",
    isPublic: false,
    required: {
      id: "2",
      name: "Standard",
    },
    viewable: false,
    author: {
      id: "1",
      name: "Creator",
    },
    title: "Something special for my Standard+ members",
  },
];

export default function CreatorPage() {
  const { creatorId } = useParams();

  const [memberships, setMemberships] = useState([]);
  const [ErrorLog, setErrorLog] = useState("");

  // retrieve data for the creator page
  useEffect(() => {
    // From Fetching data with Effects in the useEffects React docs
    // Used to prevent a race condition when multiple requests are made
    let ignore = false;
    setMemberships([]);
    module
      .getAllMemberships(creatorId)
      .then((res) => {
        if (!ignore) {
          if (res.error) return setErrorLog(res.error);
          setMemberships(res.data.memberships);
        }
      })
      .catch(
        (e) => e.response?.data?.error && setErrorLog(e.response.data.error)
      );
    return () => {
      ignore = true;
    };
    // TODO removing this constant causes an infinite loop of database requests
  }, [creatorId]);

  // TODO: consider what behaviour to do with medium, small, xs screen widths
  // TODO: make memberships horizontally scrollable or add next/prev arrows when
  // more memberships than the screen width (probably more than 3)
  const navigate = useNavigate();

  const goToPurchase = (id) => {
    navigate(`/purchase/${creatorId}`, { state: { membershipId: id } });
  };

  const postComponents = posts.map((post) => {
    const options = {
      preview: true,
      isPublic: post.isPublic,
      locked: !post.viewable,
      author: post.author,
      title: post.title,
    };
    // show content if the user can view it
    if (post.viewable) {
      options.description = post.description;
      options.likes = post.likes;
      options.dislikes = post.dislikes;
      options.comments = post.comments;
    } else {
      options.lockedReason = `You need to be at least a ${post.required.name} member to view this post.`;
    }

    return <Post key={`post-${post.id}`} {...options} />;
  });

  return (
    <StrictMode>
      <div className="page center">
        <Alert text={ErrorLog} isError={true} hide={ErrorLog === ""} />
        <PageTitle text="Creator" />
        <SubTitle text="Memberships" />
        <div className="memberships-container">
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
        <SubTitle text="Posts" />
        <div className="posts-container">{postComponents}</div>
      </div>
    </StrictMode>
  );
}
