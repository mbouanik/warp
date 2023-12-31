const forms_list = document.querySelector(".forms-list");
const header_follow_form = document.querySelector(".header-follow-form");
forms_list.addEventListener("submit", (evt) => {
  if (evt.target.classList.contains("follows")) {
    evt.preventDefault();

    follow_user(parseInt(evt.target.id));
    // follow_form(evt);
    forms_list_follow(evt);
  } else if (evt.target.classList.contains("follows-btn")) {
    evt.preventDefault();
    follow_user(parseInt(evt.target.id));
    follow_form(evt.target);
  } else if (evt.target.classList.contains("delete-msg")) {
    // confirm("Are you sure to delete this post?");
    if (window.location.pathname != `/messages/${evt.target.id}`) {
      evt.preventDefault();
      delete_msg(parseInt(evt.target.id));
      stat_msg = document.querySelector(".stat-msg");
      if (stat_msg) {
        stat_msg.innerText = `${parseInt(stat_msg.innerText) - 1}`;
      }
      const msg = document.querySelector(`#msg${evt.target.id}`);
      msg.remove();
    }
  } else if (evt.target.classList.contains("like-form")) {
    evt.preventDefault();
    like_msg(parseInt(evt.target.id));
    like_form(evt);
  } else if (evt.target.classList.contains("repost-form")) {
    evt.preventDefault();
    repost(parseInt(evt.target.id));
    repost_form(evt);
  }
});

if (header_follow_form) {
  header_follow_form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    follow_user(parseInt(evt.target.id));
    follow_form(evt.target);
  });
}

async function repost(msg_id) {
  const data = {
    message_id: msg_id,
  };
  await axios
    .post("/messages/repost", data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function repost_form(evt) {
  evt.preventDefault();
  const msg_id = parseInt(evt.target.id);
  const repost_icon = document.querySelector(`#repost_icon${msg_id}`);
  if (repost_icon.classList.contains("reposted")) {
    repost_icon.classList.remove("reposted");
    repost_icon.innerText = ` ${parseInt(repost_icon.innerText) - 1}`;
  } else {
    repost_icon.classList.add("reposted");
    repost_icon.innerText = ` ${parseInt(repost_icon.innerText) + 1}`;
  }
}

async function follow_user(user_id) {
  follow_id = user_id;
  data = {
    follow_id: follow_id,
  };
  await axios
    .post("/users/follow", data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function follow_form(evt) {
  if (evt[0].children[0].innerText == "Follow") {
    evt[0].children[0].innerText = "Following";
    evt[0].classList.remove("btn-outline-primary");
    evt[0].classList.add("btn-primary");
    evt[0].classList.add("unfollow");
    evt[0].setAttribute("data-hover", "Unfollow");
  } else {
    evt[0].children[0].innerText = "Follow";
    evt[0].classList.remove("btn-primary");
    evt[0].classList.remove("unfollow");
    evt[0].classList.add("btn-outline-primary");
  }
  const stat_following = document.querySelector(".stat-following");
  const user_id = document.querySelector(".logout");
  if (
    stat_following &&
    stat_following.attributes.id.value == user_id.attributes.id.value
  ) {
    if (evt[0].innerText == "Follow") {
      stat_following.innerText = `${parseInt(stat_following.innerText) - 1}`;
    } else {
      stat_following.innerText = `${parseInt(stat_following.innerText) + 1}`;
    }
  }
  const follows = document.querySelectorAll(".follows");
  if (follows) {
    renaming_btn(follows, evt.id);
  }
}

function renaming_profile_follow_btn(evt) {
  if (evt[0].children[0].innerText == "Follow") {
    evt[0].children[0].innerText = "Following";
    evt[0].classList.remove("btn-outline-primary");
    evt[0].classList.add("btn-primary");
    evt[0].classList.add("unfollow");
    evt[0].setAttribute("data-hover", "Unfollow");
  } else {
    evt[0].children[0].innerText = "Follow";
    evt[0].classList.remove("btn-primary");
    evt[0].classList.remove("unfollow");
    evt[0].classList.add("btn-outline-primary");
  }
}

function renaming_btn(msgs, user_id) {
  msgs.forEach((msg) => {
    if (msg.attributes.id.value == user_id) {
      if (msg.children[0].innerText == "Follow") {
        msg.children[0].innerText = "Unfollow";
      } else {
        msg.children[0].innerText = "Follow";
      }
    }
  });
}

function forms_list_follow(evt) {
  msgs = document.querySelectorAll(".follows");
  user_id = evt.target.id;
  let res = "";
  msgs.forEach((msg) => {
    if (msg.attributes.id.value == user_id) {
      if (msg.children[0].innerText == "Follow") {
        msg.children[0].innerText = "Unfollow";
        res = "Unfollow";
        msg.children[0].classList.remove("text-primary");
        msg.children[0].classList.add("text-danger");
      } else {
        msg.children[0].innerText = "Follow";
        msg.children[0].classList.add("text-primary");
        msg.children[0].classList.remove("text-danger");

        res = "Follow";
      }
    }
  });
  const header_follow_btn = document.querySelector(".header-follow-form");
  if (header_follow_btn) {
    renaming_profile_follow_btn(header_follow_btn);
  }
  const stat_following = document.querySelector(".stat-following");

  const guser_id = document.querySelector(".logout");
  if (
    stat_following &&
    stat_following.attributes.id.value == guser_id.attributes.id.value
  ) {
    if (res == "Follow") {
      stat_following.innerText = `${parseInt(stat_following.innerText) - 1}`;
    } else {
      stat_following.innerText = `${parseInt(stat_following.innerText) + 1}`;
    }
  }
}

function like_form(evt) {
  evt.preventDefault();
  const msg_id = parseInt(evt.target.id);
  const like_icon = document.querySelector(`#like_icon${msg_id}`);
  const stat_likes = document.querySelector(".stat-likes");
  const user_id = document.querySelector(".logout");
  if (like_icon.classList.contains("fa-regular")) {
    like_icon.classList.remove("fa-regular");
    like_icon.classList.add("fa-solid");
    like_icon.classList.add("liked");
    like_icon.innerText = ` ${parseInt(like_icon.innerText) + 1}`;

    if (
      stat_likes &&
      stat_likes.attributes[0].value == user_id.attributes[0].value
    ) {
      stat_likes.innerText = `${parseInt(stat_likes.innerText) + 1}`;
    }
  } else {
    like_icon.classList.remove("fa-solid");
    like_icon.classList.add("fa-regular");
    like_icon.classList.add("not-liked");
    like_icon.classList.remove("liked");
    like_icon.innerText = ` ${parseInt(like_icon.innerText) - 1}`;

    if (
      stat_likes &&
      stat_likes.attributes[0].value == user_id.attributes[0].value
    ) {
      stat_likes.innerText = `${parseInt(stat_likes.innerText) - 1}`;
    }
  }
}

async function like_msg(msg_id) {
  const data = {
    message_id: msg_id,
  };
  const rest = await axios
    .post(`/messages/like`, data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function delete_msg(msg_id) {
  data = {
    message_id: msg_id,
  };
  await axios.post("/messages/delete", data);
}

const text_post_form = document.querySelector("#text_post_form");
text_post_form.addEventListener("keyup", (evt) => {
  const current = document.querySelector("#current_post");
  current.innerText = evt.target.value.length;
});
