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
    onlineUsers = onlineUsers.filter((users) => users.socketId !== socket.id);
    console.log("DISCONNECTED");
    console.log("left users");
    console.log(onlineUsers);
  });

  socket.on("send-message", async (data) => {
    console.log(data);
    const user = onlineUsers.find((user) => user.userId == data.recieverid);
    if (user) {
      console.log(user.socketId + "THIS IS THE USER RETURNING");
      let emitid = user.socketId;
      console.log(emitid);
      io.emit("receive-message", data);
    }
  });

  socket.on("video-call", async (data) => {
    console.log(data);
    io.emit("recieve-call", data);
  });

  socket.on("endCall-by-outgoing", async (data) => {
    io.emit("endcall-outGoing", data);
  });

  socket.on("Decline-call",async(data)=>{
    io.emit("decline-call-outgoing",data)
  })
});
