//! Hides the loading screen when the page is loaded !//

const splash = document.querySelector(".splashscreen");
let hideCompletely = () => {
  splash.classList.remove("active", "hidden");
};

const hideSplash = () => {
  window.addEventListener("load", () => {
    splash.classList.add("hidden");
    setTimeout(hideCompletely, 350);
  });
};
hideSplash();

//! ------------------------------------------------------------------------------------------- !//

//! Guided tour play !//

//* Scrolls down on load to the yellow border when the guided tour plays
const scrollDown = () => {
  window.scroll(0, 363.1);
};

//* Checks if a cookie exists for the guided tour.
//* If not, it plays the first visit guided tour and created a cookie.
//* If yes, it doesn't play the first visit guided tour.
let checkCookie = () => {
  const guidedNext = document.querySelector("#guidedNext");
  const guidedOver = document.querySelector("#guidedOver");
  const guidedTour = document.querySelector(".guidedTour");
  const tabsTour = document.querySelector(".tabsTour");
  const navTour = document.querySelector(".navTour");
  if (window.innerWidth < 768) {
    guidedTour.classList.remove("active");
  }
  if (document.cookie.includes("guidedTour=Over")) {
    guidedTour.classList.remove("active");
  } else {
    const guidedTourPlay = () => {
      window.addEventListener("load", () => {
        scrollDown();
      });
      guidedNext.addEventListener("click", () => {
        tabsTour.classList.remove("active");
        navTour.classList.add("active");
        guidedNext.classList.add("active");
      });
      guidedOver.addEventListener("click", () => {
        guidedOver.classList.add("active");
        guidedTour.classList.remove("active");
        visited = "Over";
        document.cookie = `guidedTour=${visited}; path=/; secure`;
      });
    };
    guidedTourPlay();
  }
};
checkCookie();

//! ------------------------------------------------------------------------------------------- !//

//! Switches between both sections of the app

let sectionSwitch = () => {
  const collections = document.querySelectorAll(".collect");
  const edit = document.querySelectorAll(".edit");
  const switches = document.querySelectorAll(".switches");
  switches.forEach((element) => {
    element.addEventListener("click", () => {
      switches.forEach((everySwitch) => {
        everySwitch.classList.remove("active");
      });
      element.classList.add("active");
      if (collections[0].classList[2] == "active") {
        edit[0].classList.remove("active");
        edit[1].classList.remove("active");
        collections[1].classList.add("active");
      } else {
        edit[1].classList.add("active");
        collections[0].classList.remove("active");
        collections[1].classList.remove("active");
      }
    });
  });
};
sectionSwitch();

//! ------------------------------------------------------------------------------------------- !//

//! Intersection observer for the nav bar

const animatedNav = () => {
  const areas = document.querySelectorAll(".text-area");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      const id = entry.target.getAttribute("id");
      if (entry.isIntersecting) {
        document
          .querySelector('a[href="#' + id + '"]')
          .classList.add("active-link");
      } else {
        document
          .querySelector('a[href="#' + id + '"]')
          .classList.remove("active-link");
      }
    });
  });
  areas.forEach((area) => {
    observer.observe(area);
  });
};
animatedNav();

// CodePen d'origine:
// https://codepen.io/MaxSebastian/pen/jOzMWxE

//! ------------------------------------------------------------------------------------------- !//

//! Code copier

//* Fetches all the Click to Copy buttons then adds the active class on click for 1s and copies the content
const copyContent = () => {
  const copyBtn = document.querySelectorAll(".copyCode");
  copyBtn.forEach((button) => {
    const removeClassActive = () => {
      button.classList.remove("active");
      button.blur();
    };
    button.addEventListener("click", async () => {
      button.classList.add("active");
      setTimeout(removeClassActive, 1000);
      //? Remove '.firstElementChild' to get the whole <table> but that's not what we want. We're looking for everything's that inside the table
      const copiedInfo = button.nextElementSibling.firstElementChild.innerHTML;
      console.log(copiedInfo);
      await navigator.clipboard.writeText(copiedInfo);
    });
  });
};
copyContent();

//! ------------------------------------------------------------------------------------------- !//

//! Code pusher

//* Removes added classes to titles when pushing it into the editor so they aren't modified when we customize another one
//* Removes added classes to buttons when pushing it into the editor so they aren't modified when we customize another one
let removeUnwantedClasses = () => {
  let customizedNews2 = document.querySelectorAll(".customNews2");
  let editorTitles = customizedNews2[1].querySelectorAll(".personalizedTitle");
  editorTitles.forEach((title) => {
    title.classList.remove("personalizedTitle");
  });
  let editorBtns = customizedNews2[1].querySelectorAll(".personalizedBtn");
  editorBtns.forEach((Btn) => {
    Btn.classList.remove("personalizedBtn");
  });
};

//* Fetches all the Click to Add buttons then adds the active class on click for 1s and pushes the content into the editor
const pushContent = () => {
  const sendBtn = document.querySelectorAll(".sendCode");
  let index = 0;
  sendBtn.forEach((button) => {
    const removeClassActive = () => {
      button.classList.remove("active");
      button.blur();
    };
    button.addEventListener("click", () => {
      index++;
      button.classList.add("active");
      setTimeout(removeClassActive, 1000);
      //? Remove '.firstElementChild' to get the whole <table> but that's not what we want. We're looking for everything's that inside the table
      const gottenInfo =
        button.nextElementSibling.nextElementSibling.firstElementChild
          .innerHTML;
      console.log(gottenInfo);
      let custom = document.querySelector(".customNews");
      let custom2 = document.querySelectorAll(".customNews2");
      if (index == 1) {
        console.log("Step1");
        custom.innerHTML += gottenInfo;
        const preview = custom.cloneNode(true);
        preview.classList.add("floating", ".customNews3");
        preview.classList.remove(".customNews");
        document.querySelector(".docNav").appendChild(preview);
        document
          .querySelectorAll(".customNews2")[0]
          .classList.add("customNewsPreview");
        document
          .querySelectorAll(".customNews2")[0]
          .classList.remove("customNews2");
        // custom.classList.add('floating');
        // document.querySelector('.docNav').after(custom)
      } else if (index == 2) {
        console.log("Step2");
        console.log(custom2.innerHTML);
        //! If creation if broken, turn this "+=" into "=" and it should work
        //! If it is still broken, check the custom2 Index, it must be the last one, so if templates are added, it need to be incremented for each addition
        custom2[11].innerHTML += gottenInfo;
        document.querySelector(".customNewsPreview").innerHTML += gottenInfo;
        removeUnwantedClasses();
      } else {
        console.log("Step3");
        console.log(custom2.innerHTML);
        custom2[11].innerHTML += gottenInfo;
        document.querySelector(".customNewsPreview").innerHTML += gottenInfo;
        removeUnwantedClasses();
      }
    });
  });
};
pushContent();

//! ------------------------------------------------------------------------------------------- !//

//! Personalizes text blocks

//* Fetches the customizable text block and change its content, as well as its alignement.
let changeBlockText = () => {
  let personalizedBlockText = document.querySelectorAll(
    ".personalizedBlockText"
  );
  let fetchedText = document.querySelector("#blocText");
  let fetchedAlign = document.querySelector("#blocTextJustify");
  fetchedText.addEventListener("input", () => {
    fetchedText = document.querySelector("#blocText").value;
    personalizedBlockText[0].innerHTML = fetchedText;
  });
  fetchedAlign.addEventListener("input", () => {
    console.log(fetchedAlign.value);
    personalizedBlockText[0].style.textAlign = fetchedAlign.value;
  });
};
changeBlockText();

//! ------------------------------------------------------------------------------------------- !//

//! Personalizes titles

//* Fetches all the customizable titles and change their title
let changeTitle = () => {
  let personalizedTitle = document.querySelectorAll(".personalizedTitle");
  let fetchedTitle = document.querySelector("#titleText");
  fetchedTitle.addEventListener("input", () => {
    fetchedTitle = document.querySelector("#titleText").value;
    personalizedTitle.forEach((element) => {
      element.innerHTML = fetchedTitle;
    });
  });
};
changeTitle();

//! ------------------------------------------------------------------------------------------- !//

//! Personalizes sub-titles

//* Fetches all the customizable titles and change their sub-title
let changeSubTitle = () => {
  let personalizedSubTitle = document.querySelectorAll(".personalizedSubTitle");
  let fetchedSubTitle = document.querySelector("#secondaryText");
  fetchedSubTitle.addEventListener("input", () => {
    fetchedSubTitle = document.querySelector("#secondaryText").value;
    personalizedSubTitle.forEach((element) => {
      element.innerHTML = fetchedSubTitle;
    });
  });
};
changeSubTitle();

//! ------------------------------------------------------------------------------------------- !//

//! Personalizes accent color

//* Gives an active class to the selected color button and gives the color picked to the titles' accents

let changeAccentColor = () => {
  let colorPickers = document.querySelectorAll(".titleColours");
  let customColor = document.querySelector("#titleCustom");
  let customColor2 = document.querySelector("#titleCustom2");
  colorPickers.forEach((picker) => {
    picker.addEventListener("click", () => {
      colorPickers.forEach((pick) => {
        pick.classList.remove("active");
      });
      picker.classList.add("active");
      let color = picker.getAttribute("color");
      let titleAccents = document.querySelectorAll(".titleAccents");
      titleAccents.forEach((accent) => {
        accent.style.backgroundColor = color;
        customColor.addEventListener("input", () => {
          accent.style.backgroundColor = customColor.value;
        });
        customColor2.addEventListener("input", () => {
          accent.style.backgroundColor = customColor2.value;
        });
      });
    });
  });
};
changeAccentColor();

//! ------------------------------------------------------------------------------------------- !//

//! Personalizes title color

//* Gives an active class to the selected color button and gives the color picked to the title and subtitle

let changeTitleColor = () => {
  let colorPickers2 = document.querySelectorAll(".titleColours2");
  let customColorV2 = document.querySelector("#titleCustomV2");
  let customColorV3 = document.querySelector("#titleCustomV3");
  colorPickers2.forEach((picker) => {
    picker.addEventListener("click", () => {
      colorPickers2.forEach((pick) => {
        pick.classList.remove("active");
      });
      picker.classList.add("active");
      let color = picker.getAttribute("color");
      let moddedTitle = document.querySelectorAll(".personalizedTitle");
      let moddedSubTitle = document.querySelectorAll(".personalizedSubTitle");
      moddedTitle.forEach((accent) => {
        accent.style.color = color;
        customColorV2.addEventListener("input", () => {
          accent.style.color = customColorV2.value;
        });
        customColorV3.addEventListener("input", () => {
          accent.style.color = customColorV3.value;
        });
      });
      moddedSubTitle.forEach((mod) => {
        mod.style.color = color;
        customColorV2.addEventListener("input", () => {
          mod.style.color = customColorV2.value;
        });
        customColorV3.addEventListener("input", () => {
          mod.style.color = customColorV3.value;
        });
      });
    });
  });
};
changeTitleColor();

//! ------------------------------------------------------------------------------------------- !//

//! Personalizes banners

//* Fetches all the customizable banners and change their image source, alt text and redirect link
let changeBanner = () => {
  let deskBanner = document.querySelectorAll(".desktopBan");
  let mobBanner = document.querySelectorAll(".mobileBan");
  let redirectBanner = document.querySelectorAll(".redirectBan");
  let fetchedDeskBanner = document.querySelector("#deskBan");
  let fetchedMobBanner = document.querySelector("#mobBan");
  let fetchedRedirectBanner = document.querySelector("#redirectBan");
  let fetchedAltBanner = document.querySelector("#altBan");
  fetchedDeskBanner.addEventListener("input", () => {
    fetchedDeskBanner = document.querySelector("#deskBan").value;
    deskBanner.forEach((e) => {
      e.src = fetchedDeskBanner;
    });
  });
  fetchedMobBanner.addEventListener("input", () => {
    fetchedMobBanner = document.querySelector("#mobBan").value;
    mobBanner.forEach((e) => {
      e.src = fetchedMobBanner;
    });
  });
  fetchedRedirectBanner.addEventListener("input", () => {
    fetchedRedirectBanner = document.querySelector("#redirectBan").value;
    redirectBanner.forEach((element) => {
      element.href = fetchedRedirectBanner;
    });
  });
  fetchedAltBanner.addEventListener("input", () => {
    fetchedAltBanner = document.querySelector("#altBan").value;
    deskBanner.forEach((e) => {
      e.alt = fetchedAltBanner;
    });
    mobBanner.forEach((e) => {
      e.alt = fetchedAltBanner;
    });
  });
};
changeBanner();

//! ------------------------------------------------------------------------------------------- !//

//! Personalizes TwinBlocks

//* Fetches all the customizable TwinBlocks and change their image source, alt text and redirect link
let changeTwinBlocks = () => {
  let firstBanner = document.querySelectorAll(".firstBan");
  let secondBanner = document.querySelectorAll(".secondBan");
  let thirdBanner = document.querySelectorAll(".thirdBan");
  let fourthBanner = document.querySelectorAll(".fourthBan");
  let redirectFirstBanner = document.querySelectorAll(".redirectFirstBan");
  let redirectSecondBanner = document.querySelectorAll(".redirectSecondBan");
  let redirectThirdBanner = document.querySelectorAll(".redirectThirdBan");
  let redirectFourthBanner = document.querySelectorAll(".redirectFourthBan");
  let fetchedFirstBan = document.querySelector("#firstBan");
  let fetchedSecondBan = document.querySelector("#secondBan");
  let fetchedThirdBan = document.querySelector("#thirdBan");
  let fetchedFourthBan = document.querySelector("#fourthBan");
  let fetchedRedirectFirstBan = document.querySelector("#redirectFirstBan");
  let fetchedRedirectSecondBan = document.querySelector("#redirectSecondBan");
  let fetchedRedirectThirdBan = document.querySelector("#redirectThirdBan");
  let fetchedRedirectFourthBan = document.querySelector("#redirectFourthBan");
  let fetchedAltFirstBan = document.querySelector("#altFirstBan");
  let fetchedAltSecondBan = document.querySelector("#altSecondBan");
  let fetchedAltThirdBan = document.querySelector("#altThirdBan");
  let fetchedAltFourthBan = document.querySelector("#altFourthBan");
  fetchedFirstBan.addEventListener("input", () => {
    fetchedFirstBan = document.querySelector("#firstBan").value;
    firstBanner.forEach((element) => {
      element.src = fetchedFirstBan;
    });
  });
  fetchedSecondBan.addEventListener("input", () => {
    fetchedSecondBan = document.querySelector("#secondBan").value;
    secondBanner.forEach((element) => {
      element.src = fetchedSecondBan;
    });
  });
  fetchedThirdBan.addEventListener("input", () => {
    fetchedThirdBan = document.querySelector("#thirdBan").value;
    thirdBanner.forEach((element) => {
      element.src = fetchedThirdBan;
    });
  });
  fetchedFourthBan.addEventListener("input", () => {
    fetchedFourthBan = document.querySelector("#fourthBan").value;
    fourthBanner.forEach((element) => {
      element.src = fetchedFourthBan;
    });
  });
  fetchedRedirectFirstBan.addEventListener("input", () => {
    fetchedRedirectFirstBan = document.querySelector("#redirectFirstBan").value;
    redirectFirstBanner.forEach((element) => {
      element.href = fetchedRedirectFirstBan;
    });
  });
  fetchedRedirectSecondBan.addEventListener("input", () => {
    fetchedRedirectSecondBan =
      document.querySelector("#redirectSecondBan").value;
    redirectSecondBanner.forEach((element) => {
      element.href = fetchedRedirectSecondBan;
    });
  });
  fetchedRedirectThirdBan.addEventListener("input", () => {
    fetchedRedirectThirdBan = document.querySelector("#redirectThirdBan").value;
    redirectThirdBanner.forEach((element) => {
      element.href = fetchedRedirectThirdBan;
    });
  });
  fetchedRedirectFourthBan.addEventListener("input", () => {
    fetchedRedirectFourthBan =
      document.querySelector("#redirectFourthBan").value;
    redirectFourthBanner.forEach((element) => {
      element.href = fetchedRedirectFourthBan;
    });
  });
  fetchedAltFirstBan.addEventListener("input", () => {
    fetchedAltFirstBan = document.querySelector("#altFirstBan").value;
    firstBanner.forEach((element) => {
      element.alt = fetchedAltFirstBan;
    });
  });
  fetchedAltSecondBan.addEventListener("input", () => {
    fetchedAltSecondBan = document.querySelector("#altSecondBan").value;
    secondBanner.forEach((element) => {
      element.alt = fetchedAltSecondBan;
    });
  });
  fetchedAltThirdBan.addEventListener("input", () => {
    fetchedAltThirdBan = document.querySelector("#altThirdBan").value;
    thirdBanner.forEach((element) => {
      element.alt = fetchedAltThirdBan;
    });
  });
  fetchedAltFourthBan.addEventListener("input", () => {
    fetchedAltFourthBan = document.querySelector("#altFourthBan").value;
    fourthBanner.forEach((element) => {
      element.alt = fetchedAltFourthBan;
    });
  });
};
changeTwinBlocks();

//! ------------------------------------------------------------------------------------------- !//

//! Personalizes products

//* Fetches all the customizable titles and change their title and colors
let changeProduct = () => {
  // ! Product One
  let productOne = document.querySelectorAll(".productOne");
  let firstProductRedirect = document.querySelector("#firstProductRedirect");
  firstProductRedirect.addEventListener("input", () => {
    productOne.forEach((product) => {
      product.firstElementChild.firstElementChild.href =
        firstProductRedirect.value;
      product.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.href =
        firstProductRedirect.value;
    });
  });
  let firstProductImage = document.querySelector("#firstProductImage");
  firstProductImage.addEventListener("input", () => {
    productOne.forEach((product) => {
      product.firstElementChild.firstElementChild.firstElementChild.src =
        firstProductImage.value;
    });
  });
  let firstProductAlt = document.querySelector("#firstProductAlt");
  firstProductAlt.addEventListener("input", () => {
    productOne.forEach((product) => {
      product.firstElementChild.firstElementChild.firstElementChild.alt =
        firstProductAlt.value;
    });
  });
  let firstProductText = document.querySelector("#firstProductText");
  firstProductText.addEventListener("input", () => {
    productOne.forEach((product) => {
      product.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerHTML =
        firstProductText.value;
    });
  });
  let firstProductBtn = document.querySelector("#firstProductBtn");
  firstProductBtn.addEventListener("input", () => {
    productOne.forEach((product) => {
      product.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.innerHTML =
        firstProductBtn.value;
    });
  });
  // ! Product Two
  let productTwo = document.querySelectorAll(".productTwo");
  let secondProductRedirect = document.querySelector("#secondProductRedirect");
  secondProductRedirect.addEventListener("input", () => {
    productTwo.forEach((product) => {
      product.firstElementChild.firstElementChild.href =
        secondProductRedirect.value;
      product.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.href =
        secondProductRedirect.value;
    });
  });
  let secondProductImage = document.querySelector("#secondProductImage");
  secondProductImage.addEventListener("input", () => {
    productTwo.forEach((product) => {
      product.firstElementChild.firstElementChild.firstElementChild.src =
        secondProductImage.value;
    });
  });
  let secondProductAlt = document.querySelector("#secondProductAlt");
  secondProductAlt.addEventListener("input", () => {
    productTwo.forEach((product) => {
      product.firstElementChild.firstElementChild.firstElementChild.alt =
        secondProductAlt.value;
    });
  });
  let secondProductText = document.querySelector("#secondProductText");
  secondProductText.addEventListener("input", () => {
    productTwo.forEach((product) => {
      product.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerHTML =
        secondProductText.value;
    });
  });
  let secondProductBtn = document.querySelector("#secondProductBtn");
  secondProductBtn.addEventListener("input", () => {
    productTwo.forEach((product) => {
      product.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.innerHTML =
        secondProductBtn.value;
    });
  });
  // ! Product Three
  let productThree = document.querySelectorAll(".productThree");
  let thirdProductRedirect = document.querySelector("#thirdProductRedirect");
  thirdProductRedirect.addEventListener("input", () => {
    productThree.forEach((product) => {
      product.firstElementChild.firstElementChild.href =
        thirdProductRedirect.value;
      product.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.href =
        thirdProductRedirect.value;
    });
  });
  let thirdProductImage = document.querySelector("#thirdProductImage");
  thirdProductImage.addEventListener("input", () => {
    productThree.forEach((product) => {
      product.firstElementChild.firstElementChild.firstElementChild.src =
        thirdProductImage.value;
    });
  });
  let thirdProductAlt = document.querySelector("#thirdProductAlt");
  thirdProductAlt.addEventListener("input", () => {
    productThree.forEach((product) => {
      product.firstElementChild.firstElementChild.firstElementChild.alt =
        thirdProductAlt.value;
    });
  });
  let thirdProductText = document.querySelector("#thirdProductText");
  thirdProductText.addEventListener("input", () => {
    productThree.forEach((product) => {
      product.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerHTML =
        thirdProductText.value;
    });
  });
  let thirdProductBtn = document.querySelector("#thirdProductBtn");
  productThree.forEach((product) => {
    console.log(product.secondElementSibling);
  });
  thirdProductBtn.addEventListener("input", () => {
    productThree.forEach((product) => {
      product.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.innerHTML =
        thirdProductBtn.value;
    });
  });
  // ! Product Four
  let productFour = document.querySelectorAll(".productFour");
  let fourthProductRedirect = document.querySelector("#fourthProductRedirect");
  fourthProductRedirect.addEventListener("input", () => {
    productFour.forEach((product) => {
      product.firstElementChild.firstElementChild.href =
        fourthProductRedirect.value;
      product.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.href =
        fourthProductRedirect.value;
    });
  });
  let fourthProductImage = document.querySelector("#fourthProductImage");
  fourthProductImage.addEventListener("input", () => {
    productFour.forEach((product) => {
      product.firstElementChild.firstElementChild.firstElementChild.src =
        fourthProductImage.value;
    });
  });
  let fourthProductAlt = document.querySelector("#fourthProductAlt");
  fourthProductAlt.addEventListener("input", () => {
    productFour.forEach((product) => {
      product.firstElementChild.firstElementChild.firstElementChild.alt =
        fourthProductAlt.value;
    });
  });
  let fourthProductText = document.querySelector("#fourthProductText");
  fourthProductText.addEventListener("input", () => {
    productFour.forEach((product) => {
      product.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerHTML =
        fourthProductText.value;
    });
  });
  let fourthProductBtn = document.querySelector("#fourthProductBtn");
  productFour.forEach((product) => {
    console.log(product.secondElementSibling);
  });
  fourthProductBtn.addEventListener("input", () => {
    productFour.forEach((product) => {
      product.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.innerHTML =
        fourthProductBtn.value;
    });
  });
};
changeProduct();

//! ------------------------------------------------------------------------------------------- !//

//! Personalizes buttons

//* Fetches all the customizable titles and change their title and colors
let changeBtn = () => {
  let personalizedButton = document.querySelectorAll(".personalizedBtn");
  let btnRedirect = document.querySelector("#redirectBtn");
  let fetchedTitle = document.querySelector("#btnText");
  fetchedTitle.addEventListener("input", () => {
    fetchedTitle = document.querySelector("#btnText").value;
    personalizedButton.forEach((element) => {
      element.innerHTML = fetchedTitle;
    });
  });
  btnRedirect.addEventListener("input", () => {
    btnRedirect = document.querySelector("#redirectBtn").value;
    personalizedButton.forEach((element) => {
      element.href = btnRedirect;
    });
  });
};
changeBtn();

//! ------------------------------------------------------------------------------------------- !//

//! Personalizes title color

//* Gives an active class to the selected color button and gives the color picked to the button's text

let changeBtnTextColor = () => {
  let colorPickers = document.querySelectorAll(".btnTextColours");
  let customColor = document.querySelector("#btnTextCustom");
  let customColor2 = document.querySelector("#btnTextCustom2");
  colorPickers.forEach((picker) => {
    picker.addEventListener("click", () => {
      colorPickers.forEach((pick) => {
        pick.classList.remove("active");
      });
      picker.classList.add("active");
      let color = picker.getAttribute("color");
      let moddedText = document.querySelectorAll(".personalizedBtn");
      moddedText.forEach((text) => {
        text.style.color = color;
        customColor.addEventListener("input", () => {
          text.style.color = customColor.value;
        });
        customColor2.addEventListener("input", () => {
          text.style.color = customColor2.value;
        });
      });
    });
  });
};
changeBtnTextColor();

//! ------------------------------------------------------------------------------------------- !//

//! Personalizes button bg

//* Gives an active class to the selected color button and gives the color picked to the button's bg

let changeBtnBgColor = () => {
  let colorPickers = document.querySelectorAll(".bgColours");
  let bgCustomColor = document.querySelector("#bgCustom");
  let bgCustomColor2 = document.querySelector("#bgCustom2");
  colorPickers.forEach((picker) => {
    picker.addEventListener("click", () => {
      colorPickers.forEach((pick) => {
        pick.classList.remove("active");
      });
      picker.classList.add("active");
      let bgColor = picker.getAttribute("color");
      let moddedBtn = document.querySelectorAll(".personalizedBtn");
      moddedBtn[0].style.borderColor = bgColor;
      moddedBtn.forEach((bg) => {
        bg.style.backgroundColor = bgColor;
        bgCustomColor.addEventListener("input", () => {
          bg.style.backgroundColor = bgCustomColor.value;
        });
        bgCustomColor2.addEventListener("input", () => {
          bg.style.backgroundColor = bgCustomColor2.value;
        });
      });
    });
  });
};
changeBtnBgColor();

//! ------------------------------------------------------------------------------------------- !//

//! Personalizes button border

//* Gives an active class to the selected color button and gives the color picked to the button's border

let changeBtnBorderColor = () => {
  let colorPickers = document.querySelectorAll(".borderColours");
  let borderCustomColor = document.querySelector("#borderCustom");
  let borderCustomColor2 = document.querySelector("#borderCustom2");
  colorPickers.forEach((picker) => {
    picker.addEventListener("click", () => {
      colorPickers.forEach((pick) => {
        pick.classList.remove("active");
      });
      picker.classList.add("active");
      let borderColor = picker.getAttribute("color");
      let moddedBtn = document.querySelectorAll(".personalizedBtn");
      moddedBtn.forEach((bg) => {
        bg.style.borderColor = borderColor;
        borderCustomColor.addEventListener("input", () => {
          bg.style.borderColor = borderCustomColor.value;
        });
        borderCustomColor2.addEventListener("input", () => {
          bg.style.borderColor = borderCustomColor2.value;
        });
      });
    });
  });
};
changeBtnBorderColor();

//! ------------------------------------------------------------------------------------------- !//

//! Responsive layout
window.addEventListener("load", function () {
  if (window.innerWidth < 768) {
    document.querySelector(".sectionSwitch").classList.add("col-12");
  } else {
    document.querySelector(".sectionSwitch").classList.remove("col-12");
  }
});

//todo Testing Zone
