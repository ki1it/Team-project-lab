const Breakdown = require('../models/Breakdown')
const BreakdownType = require('../models/BreakdownType')
const Client = require('../models/Client')
const Position = require('../models/Position')
const Service = require('../models/Service')
const ServiceList = require('../models/ServiceList')
const ServiceList_
const ServiceList_Service = require('../models/ServiceList_Service')
const ServiceListBreakdown = require('../models/ServiceListBreakdown')
const ServiceType = require('../models/ServiceType')
const StatusOfServiceList = require('../models/ServiceList_Status')
const Car = require('../models/Car')
const Worker = require('../models/Worker')
const User = require('../models/User')
const SprCar = require('../models/SprCar')
const Model = require('../models/Model')
const Brand = require('../models/Brand')
const TypeOfPayment = require('../models/TypeOfPayment')
const UrClient = require('../models/UrClient')
const InnerServiceType = require('../models/InnerServiceType')
const ServiceList_Worker = require('../models/ServiceList_Worker')

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


Position.hasMany(Worker, { foreignKey: 'PositionFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Worker.belongsTo(Position, { foreignKey: 'PositionFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Worker.hasMany(ServiceList_Worker, { foreignKey: 'WorkerFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList_Worker.belongsTo(Worker, { foreignKey: 'WorkerFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

StatusOfServiceList.hasMany(ServiceList, { foreignKey: 'Status', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(StatusOfServiceList, { foreignKey: 'Status', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Client.hasMany(ServiceList, { foreignKey: 'ClientFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(Client, { foreignKey: 'ClientFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

UrClient.hasMany(ServiceList, { foreignKey: 'UrClientFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(UrClient, { foreignKey: 'UrClientFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Car.hasMany(ServiceList, { foreignKey: 'CarFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(Car, { foreignKey: 'CarFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

SprCar.hasMany(Car, { foreignKey: 'SprCarFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
Car.belongsTo(SprCar, { foreignKey: 'SprCarFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Model.hasMany(SprCar, { foreignKey: 'ModelFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
SprCar.belongsTo(Model, { foreignKey: 'ModelFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

Brand.hasMany(SprCar, { foreignKey: 'BrandFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
SprCar.belongsTo(Brand, { foreignKey: 'BrandFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })


TypeOfPayment.hasMany(ServiceList, { foreignKey: 'TypeOfPaymentFK', sourceKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'})
ServiceList.belongsTo(TypeOfPayment, { foreignKey: 'TypeOfPaymentFK', targetKey: 'id', onDelete: 'restrict', onUpdate: 'restrict' })

User.belongsTo(Worker, { foreignKey: 'worker_id', targetKey: 'id'})
// User.hasMany(UserInGroup, { foreignKey: 'id_us', sourceKey: 'id' })
// UserInGroup.belongsTo(Group, { foreignKey: 'id_gr', targetKey: 'id' })
// UserInGroup.belongsTo(User, { foreignKey: 'id_us', targetKey: 'id' })
async function init () {
  // await Worker.sync({force:true});
  // await EdIzmer.sync({force:true})
  // await Model.sync({force:true})
  // await Brand.sync({force:true})
  // await SprCar.sync({force:true})
  // await Car.sync({force:true})
  // await Client.sync({force:true})
  // await StatusOfServiceList.sync({force:true})
  // await TypeOfPayment.sync({force:true})
  // await ServiceList.sync({force:true})
  //
  //
  // await BreakdownType.sync({force:true})
  // await Breakdown.sync({force:true})
  //   await ServiceListBreakdown.sync({force:true})
  //
  //
  // await ServiceType.sync({force:true})
  // await Service.sync({force:true})
  // await ServiceList_Service.sync({force:true})
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
  //  await User.sync({force:true})


  await EdIzmer.sync()
  await Model.sync()
  await Brand.sync()
  await SprCar.sync()
  await Car.sync()
  await UrClient.sync()
  await Client.sync()
  await StatusOfServiceList.sync()
  await TypeOfPayment.sync()
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
