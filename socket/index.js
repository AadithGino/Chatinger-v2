const { default: axios } = require("axios");

const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("add-new-user", (newUserId) => {
    if (!onlineUsers.some((users) => users.userId === newUserId)) {
      onlineUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }


    io.emit("get-users", onlineUsers);
    console.log(onlineUsers);
  });



  socket.on("disconnect", () => {
    console.log("DISCONNECGTT");
    let user = onlineUsers.find((u)=>u.socketId==socket.id)
    
    if(user?.userId!=undefined){
      axios.get("http://localhost:5000/last-seen?id="+user.userId)
    }
    onlineUsers = onlineUsers.filter((users) => users.socketId !== socket.id);;
    io.emit("get-users", onlineUsers);
  });

  // send indvidual mdssage.

  socket.on("send-message", async (data) => {
    console.log(data);
    const user = onlineUsers.find((user) => user.userId == data.socketsendMessage.recieverid);
    console.log(user);
    if (user) {
      console.log(user.socketId + "THIS IS THE USER RETURNING");
      let emitid = user.socketId;
      console.log(emitid);
      io.emit("receive-message", data);
    } else if (data.isGroupChat) {
      io.emit("receive-message", data);
    }
  });


  // send group message



  socket.on("video-call", async (data) => {
    console.log(data);
    io.emit("recieve-call", data);

  });

  socket.on("endCall-by-outgoing", async (data) => {
    io.emit("endcall-outGoing", data);
  });

  socket.on("Decline-call", async (data) => {
    io.emit("decline-call-outgoing", data)
  })

  // typing indicator

  socket.on("Typing", async (data) => {
    console.log("TYPING");
    io.emit("typing", data)
    console.log(data);
  })

  socket.on("stopTyping", async (data) => {
    io.emit("stoptyping", data)
    console.log("Stop typing");
  })

  socket.on("Block",async(data)=>{
    console.log("THIS IS BLOCKED CALLLED");
    io.emit("block",data)
  })

  socket.on("ClearChat",async(data)=>{
    console.log(data);
    io.emit("clearchat",data)
  })
});



