import "./styles/index.scss";

function getLSNote(id) {
  let data = localStorage.getItem('notes');
  if(!data) {
    data = [];
    localStorage.setItem('notes', JSON.stringify(data));
  }
  const obj = JSON.parse(data);
  const currentNote = obj.find(item => item.id === id);
  if(!currentNote) return null;
  return currentNote.value;
}

function setLSNote(note, id) {
  let data = localStorage.getItem('notes');
  data = JSON.parse(data);
  let thisNote = data.findIndex(({id:noteId}) => noteId === id );
  if(thisNote == -1) {
    data.push({id: id, value: note});
  }
  else {
    data[thisNote].value = note;
  }
  localStorage.setItem('notes', JSON.stringify(data));
}

function getBreadCrumps(data) {
  const search = data?.sections?.filter(
    ({ section_name }) => section_name === "BREADCRUMB"
  )[0]?.widgets?.[0]?.data;
  if (!search) {
    return [];
  }

  const currentPage = search.current_page_title;
  const parentPages = search.parent_items?.map((item) => {
    return item.title;
  });

  return [...parentPages, currentPage];
}

function attachBreadCrumps(data) {
  const makeBreadCrumpClass = (element) => {
    if (!element) return "breadcrump-item";
    return `breadcrump-item__${element}`;
  };

  const nodes = [];

  for (const item of data) {
    const breadItem = document.createElement("li");
    breadItem.classList.add(makeBreadCrumpClass());
    const breadItemText = document.createElement("span");
    breadItemText.classList.add(makeBreadCrumpClass("text"));
    breadItemText.innerText = item;
    const breadItemArrow = document.createElement("i");
    breadItemArrow.classList.add(makeBreadCrumpClass("arrow"));
    breadItemArrow.innerText = ">";

    breadItem.appendChild(breadItemText);
    breadItem.appendChild(breadItemArrow);

    nodes.push(breadItem);
  }
  addSpinModifier(nodes);

  nodes.forEach((node) => {
    document.getElementsByClassName("breadcrump__list")[0].appendChild(node);
  });
}

function addSpinModifier(nodes) {
  nodes.forEach((breadcrumpItem) => {
    breadcrumpItem.addEventListener("mouseenter", () => {
      const index = nodes.indexOf(breadcrumpItem);
      const rest = nodes.slice(index);
      if (rest == undefined || rest.length <= 0) return;
      rest.forEach((li) => {
        const arrow = li.children[1];
        arrow.classList = [...arrow.classList].map((ar) => {
          if (ar === "breadcrump-item__arrow")
            return "breadcrump-item__arrow--spin";
          return ar;
        });
      });
    });
    breadcrumpItem.addEventListener("mouseleave", () => {
      const index = nodes.indexOf(breadcrumpItem);
      const rest = nodes.slice(index);
      if (rest == undefined || rest.length <= 0) return;
      rest.forEach((li) => {
        const arrow = li.children[1];
        arrow.classList = [...arrow.classList].map((ar) => {
          if (ar === "breadcrump-item__arrow--spin")
            return "breadcrump-item__arrow";
          return ar;
        });
      });
    });
  });
}

function getTitle(data) {
  const search = data?.sections?.filter(
    ({ section_name }) => section_name === "TITLE"
  )[0]?.widgets[0]?.data;
  if (!search) return ["", ""];
  const title = search["title"] ?? "";
  const sub = search["subtitle"] ?? "";
  return [title, sub];
}

function attachTitle(title, sub) {
  const titleNode = document.createElement("h1");
  titleNode.classList.add("product__title");
  titleNode.innerText = title;
  const subNode = document.createElement("h2");
  subNode.classList.add("product__explain");
  subNode.innerText = sub;

  const container = document.getElementsByClassName("product__info")[0];
  container.prepend(subNode);
  container.prepend(titleNode);
}

function getImage(data) {
  const search = data?.sections?.filter(
    ({ section_name }) => section_name === "IMAGE"
  )[0]?.widgets[0]?.data?.items[0]?.image;
  if (!search) return ["", ""];
  const url = search.url ?? "";
  const alt = search.alt ?? "";
  return [url, alt];
}

function setImage(url, alt) {
  if(url.trim() === '') {
    const imageView = document.getElementsByClassName('product__image')[0];
    imageView.classList.add('hidden');
    return;
  }

  const image = document.getElementsByClassName("square-image__wrapper")[0];
  const img = document.createElement("img");
  img.classList.add("square-image__image");
  img.setAttribute("src", url);
  img.setAttribute("alt", alt);
  image.appendChild(img);
}

function getPairs(data) {
  const search = data?.sections
    ?.filter(({ section_name }) => section_name === "LIST_DATA")[0]
    ?.widgets?.filter(({ widget_type }) => widget_type === "UNEXPANDABLE_ROW")
    .map((item) => {
      return { key: item.data.title, value: item.data.value };
    });
  return search || [];
}

function createPairs(pairs) {
  const result = [];
  pairs.forEach(({ key, value }) => {
    const li = document.createElement("li");
    li.classList.add("pair-info__item");
    const title = document.createElement("h3");
    title.innerText = key;
    const text = document.createElement("span");
    text.innerText = value;
    li.appendChild(title);
    li.appendChild(text);
    result.push(li);
  });
  return result;
}

function setPairs(nodes) {
  const list = document.getElementsByClassName("pair-info__list")[0];
  nodes.forEach((node) => {
    const divide = document.createElement("hr");
    divide.classList.add("pair-info__divider");
    list.appendChild(node);
    list.appendChild(divide);
  });
}

function getDescription(data) {
  const search = data?.sections
    ?.filter(({ section_name }) => section_name === "DESCRIPTION")[0]
    ?.widgets?.filter(({ widget_type }) => widget_type === "DESCRIPTION_ROW")[0]
    ?.data?.text;
  if (!search) {
    return "";
  }
  return search.replaceAll(`\n\n`, "<br />");
}

function setDescription(description) {
  const container = document.getElementsByClassName(
    "post-description__content"
  )[0];
  container.innerHTML = description;
}

function getTags(data) {
  const search = data?.sections
    ?.filter(({ section_name }) => section_name === "TAGS")[0]
    ?.widgets[0]?.data?.chip_list?.chips;

    if(!search)
    {
        return [];
    }
  return search.map((c) => c.text);;
}

function createTags(tags) {
    const result = [];
    tags.forEach(item => {
        const tagItem = document.createElement('li');
        tagItem.classList.add('tags__item');
        const tagButton = document.createElement('button');
        tagButton.classList.add('button--active');
        tagButton.classList.add('button');
        const tagTitle = document.createElement('span');
        tagTitle.classList.add('button__title');
        tagTitle.innerText = item;

        tagButton.appendChild(tagTitle);
        tagItem.appendChild(tagButton);
        result.push(tagItem);
    });
    return result;
}

function setTags(nodes) {
    const list = document.getElementsByClassName('tags__list')[0];
    nodes.forEach(item => {
        list.appendChild(item);
    });
}

function tryGetGroupInfo(data) {
    const search = data?.sections?.filter(({section_name}) => section_name === 'LIST_DATA')[0]?.
        widgets?.filter(({widget_type}) => widget_type === 'GROUP_INFO_ROW')[0]?.
        data?.items;

    if(!search) return [];
    return search;
}

function attachGroupPairs(items) {
  const list = document.getElementsByClassName('group-info__list')[0];
  const divider = () => { 
    const div = document.createElement('hr');
    div.classList.add('group-info__divider');
    return div;
  };
  let isFirst = true;
    items.forEach(({title, value}) => {
      const listItem = document.createElement('li');
      listItem.classList.add('group-info__item');
      listItem.classList.add('pair--column');

      const listTitle = document.createElement('h4');
      listTitle.classList.add('pair__title');
      listTitle.innerText = title;
      const listValue = document.createElement('p');
      listValue.classList.add('pair__text');
      listValue.innerText = value;

      
      listItem.appendChild(listTitle);
      listItem.appendChild(listValue);

      if(!isFirst) {
        list.appendChild(divider());
      }
      list.appendChild(listItem);
      isFirst = false;
    });
}

function loadPage() {
  const idQuery = document.URL.split("id=").at(-1);
  const query = `http://localhost:9000/api/v8/posts-v2/web/${idQuery}`;
  fetch(query, {
    headers: {
      accept: "application/json-filled",
      "accept-language": "en-US,en;q=0.9,fa;q=0.8",
      "sec-ch-ua":
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    },
    referrer: "https://divar.ir/",
    referrerPolicy: "origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "omit",
  })
    .then((response) => response.json())
    .then((data) => {
      const breadCrump = getBreadCrumps(data);
      attachBreadCrumps(breadCrump);

      const [title, sub] = getTitle(data);
      attachTitle(title, sub);
      document.title = title === "" ? "Post" : title;

       const [imageUrl, imageAlt] = getImage(data);
       setImage(imageUrl, imageAlt);

      const pairs = getPairs(data);
      const pairNodes = createPairs(pairs);
      setPairs(pairNodes);

      const description = getDescription(data);
      setDescription(description);

      const tags = getTags(data);
      const tagNodes = createTags(tags);
      setTags(tagNodes);

      const groupInfo = tryGetGroupInfo(data);
      if(groupInfo.length > 0) {
        attachGroupPairs(groupInfo);
      }

    });


    const textBox = document.getElementsByClassName('notes__textbox')[0];

    const note = getLSNote(idQuery);

    textBox.innerText = note;

    textBox.addEventListener('blur', () => {
      setLSNote(textBox.value, idQuery);
    });
}

loadPage();
