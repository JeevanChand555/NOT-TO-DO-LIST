let taskList = [];
const entryElm = document.querySelector("#entry");
const badElm = document.querySelector("#bad");

const totalHrWeek = 24 * 7;

const handleOnSubmit = (event) => {
  //   console.log("form is Submittted", event);
  const newTask = new FormData(event);

  console.log(newTask);
  const task = newTask.get("task");
  const hr = newTask.get("hr");
  const obj = {
    id: randomStr(),
    task,
    hr,
    type: "entry",
  };

  const ttl = total();
  if (ttl + +hr > totalHrWeek) {
    return alert("you have exceed your total available hours per weeks !");
  }
  taskList.push(obj);

  displayTask();
  displayBadTask();
  total();
};

const displayTask = () => {
  let str = ``; // temperal literal variable dec

  const entryArg = taskList.filter((task) => task.type === "entry");

  entryArg.map((item, i) => {
    str += `<tr>
    <td scope="row">${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td>
      <button class="btn btn-sm btn-danger" onclick="handleOnDelete('${
        item.id
      }')">
              <i class="fa-solid fa-trash"></i>
      </button>
      <button class="btn btn-sm btn-success" onclick = "switchTask('${
        item.id
      }', 'bad')">
         <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
  </tr>`;
  });

  console.log(taskList);
  entryElm.innerHTML = str; //injecting in HTML
};

const displayBadTask = () => {
  let str = ``;

  const erntryArg = taskList.filter((task) => task.type === "bad");

  erntryArg.map((item, i) => {
    str += `<tr>
     <td scope="row">${i + 1}</td>
     <td>${item.task}</td>
     <td>${item.hr}</td>
     <td>
     <button class="btn btn-sm btn-warning"
     onclick="switchTask('${item.id}', 'entry')"
     >
       <i class="fa-solid fa-arrow-left "></i>
     </button>
       <button class="btn btn-sm btn-danger" onclick="handleOnDelete('${
         item.id
       }')">
         <i class="fa-solid fa-trash"></i>
       </button>
      
     </td>
    </tr>`;
  });

  badElm.innerHTML = str;
};

// deleting
const handleOnDelete = (id) => {
  console.log(id);

  if (window.confirm("Are you sure you want to delete ?")) {
    taskList = taskList.filter((item) => id !== item.id); //
    displayTask();
    displayBadTask();
    total();
  } //
};

const randomStr = () => {
  const charLength = 6;
  const str = "qwertyuiopasdfghjklzxcvbnmasdfghjklzxcvbnmqwertyuiop";

  let id = "";
  for (let i = 0; i < charLength; i++) {
    const ranNum = Math.round(Math.random() * (str.length - 1));
    id += str[ranNum];
  }
  return id;
};

const switchTask = (id, type) => {
  console.log(id, type);

  taskList = taskList.map((item) => {
    if (item.id == id) {
      item.type = type;
    }
    return item;
  });
  displayTask();
  displayBadTask();
  total();
};

const total = () => {
  const ttl = taskList.reduce((acc, item) => acc + +item.hr, 0);
  document.getElementById("total").innerText = ttl;

  const ttlbad = taskList.reduce(
    (acc, item) => (item.type == "bad" ? acc + +item.hr : acc),
    0
  );

  console.log(ttlbad);
  document.getElementById("badTotal").innerText = ttlbad;
  return ttl;
};
