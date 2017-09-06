import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Tasks} from '../../api/tasks.js';

import template from './todosList.html';
 
class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    this.helpers({
      tasks(){
        return Tasks.find({},{
          sort:{
            createdAt: -1
          }
        });
      }
    })
  }

  addTask(newTask) {
    // Insert a task into the collection
    Tasks.insert({
      text: newTask,
      createdAt: new Date
    });
 
    // Clear form
    this.newTask = '';
  }

  removeTask(removedTask){
    //Remove a task from the collection
    Tasks.remove(removedTask._id)
  }

  setChecked(task){
    Tasks.update(task._id,{
      $set:{
        checked: !task.checked
      },
    });
  }

}

export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });