const follow_form = document.querySelector(".follow-grid");
const stat_following = document.querySelector(".stat-following");
console.log(follow_form);
follow_form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains("follows")) {
    console.log("ClAIM", evt.target.id);
    follow_user(evt);
    console.log(evt);
    if (evt.target[0].innerText == "Follow") {
      evt.target[0].innerText = "Following";
      evt.target[0].classList.remove("btn-outline-primary");
      evt.target[0].classList.add("btn-primary");
      evt.target[0].classList.add("unfollow");
      evt.target[0].setAttribute("data-hover", "Unfollow");
    } else {
      evt.target[0].innerText = "Follow";
      evt.target[0].classList.remove("btn-primary");
      evt.target[0].classList.remove("unfollow");
      evt.target[0].classList.add("btn-outline-primary");
    }

    // follow_card = document.querySelector(`#user_follow${evt.target.id}`);
    // follow_card.remove();
    // stat_following.innerText = `${parseInt(stat_following.innerText) - r}`;
  }
});

async function follow_user(evt) {
  follow_id = evt.target.id;
  data = {
    follow_id: parseInt(follow_id),
  };
  res = await axios
    .post("/users/follow", data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}