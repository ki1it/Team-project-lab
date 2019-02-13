const Breakdown = require('../models/Breakdown')
const BreakdownType = require('../models/BreakdownType')
const Client = require('../models/Client')
const NameOfGood = require('../models/NameOfGood')
const NameStatus = require('../models/NameStatus')
const NameType = require('../models/NameType')
const Position = require('../models/Position')
const Service = require('../models/Service')
const ServiceList = require('../models/ServiceList')
const ServiceList_Service = require('../models/ServiceList_Service')
const ServiceListBreakdown = require('../models/ServiceListBreakdown')
const ServiceType = require('../models/ServiceType')
const StatusOfServiceList = require('../models/StatusOfServiceList')
const Task = require('../models/Task')
const TaskWorker = require('../models/TaskWorker')
const TaskStatus = require('../models/TaskStatus')
const Wagon = require('../models/Wagon')
const Worker = require('../models/Worker')
const WorkOrderName = require('../models/WorkOrderName')
const User = require('../models/User')

BreakdownType.hasMany(Breakdown, { foreignKey: 'Type', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Breakdown.belongsTo(BreakdownType, { foreignKey: 'Type', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Breakdown.hasMany(ServiceListBreakdown, { foreignKey: 'ServiceListBr', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceListBreakdown.belongsTo(Breakdown, { foreignKey: 'ServiceListBr', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

ServiceList.hasMany(ServiceListBreakdown, { foreignKey: 'ServiceListFK', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'restrict'})
ServiceListBreakdown.belongsTo(ServiceList, { foreignKey: 'ServiceListFK', targetKey: 'id', onDelete: 'cascade', onUpdate: 'restrict' })


ServiceType.hasMany(Service, { foreignKey: 'Type', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Service.belongsTo(ServiceType, { foreignKey: 'Type', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Service.hasMany(ServiceList_Service, { foreignKey: 'ServiceFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList_Service.belongsTo(Service, { foreignKey: 'ServiceFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

ServiceList.hasMany(ServiceList_Service, { foreignKey: 'ServiceListFK', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'restrict'})
ServiceList_Service.belongsTo(ServiceList, { foreignKey: 'ServiceListFK', targetKey: 'id', onDelete: 'cascade', onUpdate: 'restrict' })


NameType.hasMany(NameOfGood, { foreignKey: 'Type', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
NameOfGood.belongsTo(NameType, { foreignKey: 'Type', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

NameStatus.hasMany(NameOfGood, { foreignKey: 'Status', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
NameOfGood.belongsTo(NameStatus, { foreignKey: 'Status', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

NameOfGood.hasMany(WorkOrderName, { foreignKey: 'NameOfGoodFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
WorkOrderName.belongsTo(NameOfGood, { foreignKey: 'NameOfGoodFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

ServiceList.hasMany(WorkOrderName, { foreignKey: 'ServiceListFK', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'restrict'})
WorkOrderName.belongsTo(ServiceList, { foreignKey: 'ServiceListFK', targetKey: 'id', onDelete: 'cascade', onUpdate: 'restrict' })


Position.hasMany(Worker, { foreignKey: 'PositionFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Worker.belongsTo(Position, { foreignKey: 'PositionFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Worker.hasMany(TaskWorker, { foreignKey: 'WorkerFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
TaskWorker.belongsTo(Worker, { foreignKey: 'WorkerFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Task.hasMany(TaskWorker, { foreignKey: 'TaskFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
TaskWorker.belongsTo(Task, { foreignKey: 'TaskFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

TaskStatus.hasMany(Task, { foreignKey: 'Status', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Task.belongsTo(TaskStatus, { foreignKey: 'Status', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

ServiceList.hasMany(Task, { foreignKey: 'ServiceListFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Task.belongsTo(ServiceList, { foreignKey: 'ServiceListFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

StatusOfServiceList.hasMany(ServiceList, { foreignKey: 'Status', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(StatusOfServiceList, { foreignKey: 'Status', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Client.hasMany(ServiceList, { foreignKey: 'ClientFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(Client, { foreignKey: 'ClientFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })
Wagon.hasMany(ServiceList, { foreignKey: 'WagonFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(Wagon, { foreignKey: 'WagonFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

User.belongsTo(Worker, { foreignKey: 'worker_id', targetKey: 'id'})
// User.hasMany(UserInGroup, { foreignKey: 'id_us', sourceKey: 'id' })
// UserInGroup.belongsTo(Group, { foreignKey: 'id_gr', targetKey: 'id' })
// UserInGroup.belongsTo(User, { foreignKey: 'id_us', targetKey: 'id' })
async function init () {
  // await Worker.sync({force:true});
  // await Wagon.sync({force:true})
  // await Client.sync({force:true})
  // await StatusOfServiceList.sync({force:true})
  // await ServiceList.sync({force:true})
  //
  //
  // await BreakdownType.sync({force:true})
  // await Breakdown.sync({force:true})
  //   await ServiceListBreakdown.sync({force:true})
  //
  // await ServiceList_Service.sync({force:true})
  // await ServiceType.sync({force:true})
  // await Service.sync({force:true})
  //
  // await NameStatus.sync({force:true})
  // await NameType.sync({force:true})
  // await NameOfGood.sync({force:true})
  // await WorkOrderName.sync({force:true})
  //
  //
  // await TaskStatus.sync({force:true})
  // await Task.sync({force:true})
  // await Position.sync({force:true})
  // await Worker.sync({force:true})
  // await TaskWorker.sync({force:true})
  //

   //await User.sync({force:true})

  await Wagon.sync()
  await Client.sync()
  await StatusOfServiceList.sync()
  await ServiceList.sync()


  await BreakdownType.sync()
  await Breakdown.sync()
  await ServiceListBreakdown.sync()


  await ServiceType.sync()
  await Service.sync()
  await ServiceList_Service.sync()

  await NameStatus.sync()
  await NameType.sync()
  await NameOfGood.sync()
  await WorkOrderName.sync()


  await TaskStatus.sync()
  await Task.sync()
  await Position.sync()
  await Worker.sync()
  await TaskWorker.sync()

   await User.sync()
}

(async function f () {
  await init()
})()



// module.exports.init = init()
