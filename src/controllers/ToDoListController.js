const ToDoList = require("../models/ToDoList");

exports.CreateToDo = (req, res) => {
  let reqBody = req.body;
  const subject = reqBody["subject"];
  const description = reqBody["description"];
  const UserName = req.headers["username"];
  const status = "New";
  const CreateDate = Date.now();
  const UpdateDate = Date.now();
  const PostBody = {
    UserName: UserName,
    subject: subject,
    description: description,
    status: status,
    CreateDate: CreateDate,
    UpdateDate: UpdateDate,
  };
  ToDoList.create(PostBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(201).json({ status: "success", data: data });
    }
  });
};

exports.SelectToDo = (req, res) => {
  let UserName = req.headers["username"];

  ToDoList.find({ UserName: UserName }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};
exports.UpdateToDo = (req, res) => {
  const subject = req.body["subject"];
  const description = req.body["description"];
  const _id = req.body["_id"];
  const UpdateDate = Date.now();

  const PostBody = {
    subject: subject,
    description: description,
    UpdateDate: UpdateDate,
  };
  ToDoList.updateOne(
    { _id: _id },
    { $set: PostBody },
    { upsert: true },
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};
exports.UpdateStatus = (req, res) => {
  const status = req.body["status"];
  const _id = req.body["_id"];
  const UpdateDate = Date.now();

  const PostBody = {
    status: status,
    UpdateDate: UpdateDate,
  };
  ToDoList.updateOne(
    { _id: _id },
    { $set: PostBody },
    { upsert: true },
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};
exports.RemoveToDo = (req, res) => {
  const _id = req.body["_id"];

  ToDoList.remove({ _id: _id }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};
exports.SelectToDoByStatus = (req, res) => {
  let UserName = req.headers["username"];
  const status = req.body["status"];

  ToDoList.find({ UserName: UserName, status: status }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};
exports.SelectToDoByDate = (req, res) => {
  let UserName = req.headers["username"];
  const from = req.body["from"];
  const to = req.body["to"];

  ToDoList.find(
    {
      UserName: UserName,
      CreateDate: { $gte: new Date(from), $lte: new Date(to) },
    },
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};
