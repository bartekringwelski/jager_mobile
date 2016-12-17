angular.module('jobTracker.statsFactory', [])
.factory('StatsFactory', function () {
  var stats = {
    applied: 10,
    active: 0,
    noresponse: 0,
    responded: 0,
    phone: 0,
    interview: 0,
    offer: 0,
    rejected: 0
  };
  var stateNow = {
    applied: 0,
    responded: 0,
    phone: 0,
    interview: 0,
    offer: 0
  };

  var calculateStats = function(scope) {
      ///////////////////////
      ///TOTAL AND ACTIVE///
      //////////////////////

      scope.stats.total = scope.jobs.length;
      scope.stats.active = scope.jobs.filter((job) => {
        return !job.status.rejected && job.status.progress > 1;
      }).length;

      ///////////////////
      ///GENERAL STATS///
      //////////////////
      scope.stats.applied = scope.jobs.filter((job) => {
        return job.status.progress > 1;
      }).length;

      scope.stats.responded = scope.jobs.filter((job) => {
        return job.status.progress > 2;
      }).length;

      scope.stats.noresponse = scope.stats.applied - scope.stats.responded;

      scope.stats.phone = scope.jobs.filter((job) => {
        return job.status.progress > 3;
      }).length;

      scope.stats.interview = scope.jobs.filter((job) => {
        return job.status.progress > 4;
      }).length;

      scope.stats.offer = scope.jobs.filter((job) => {
        return job.status.progress > 5;
      }).length;

      scope.stats.rejected = scope.jobs.filter((job) => {
        return job.status.rejected;
      }).length;
      ////////////////////
      ////CURRENT STATE///
      ////////////////////
      scope.stateNow.applied = scope.jobs.filter((job) => {return job.status.progress === 2}).length;
      scope.stateNow.responded = scope.jobs.filter((job) => {return job.status.progress === 3}).length;
      scope.stateNow.phone = scope.jobs.filter((job) => {return job.status.progress === 4}).length;
      scope.stateNow.interview = scope.jobs.filter((job) => {return job.status.progress === 5}).length;
      scope.stateNow.offer = scope.jobs.filter((job) => {return job.status.progress === 6}).length;


      scope.currentStage = [
        {value: scope.stateNow.applied, text: "Awaiting Response", type: 'danger'},
        {value: scope.stateNow.responded, text: "Received Response", type: 'info'},
        {value: scope.stateNow.phone, text: "Phone Screen Scheduled", type: 'warning'},
        {value: scope.stateNow.interview, text: "Interview Scheduled", type: 'info'},
        {value: scope.stateNow.offer, text: "Offers Received", type: "success"}
      ];
    };

    return {
      calculateStats: calculateStats,
      stats: stats,
      stateNow: stateNow
    }
})
