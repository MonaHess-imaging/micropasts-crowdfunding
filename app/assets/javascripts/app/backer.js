App.addChild('Backer', _.extend({
  el: 'form#backer_form',

  events: {
    'change #backer_value' : 'resetReward',
    'click input[type=radio]' : 'clickReward',
    'click #backer_anonymous' : 'clickAnonymous',
    'change #backer_credits' : 'checkCredits',
    'click .procceed-button': 'clickProcceed'
  },

  clickProcceed: function(){
    $.scrollTo($('a#procceed'), 350);
    return false;
  },

  checkCredits: function(event){
    if(event.currentTarget.checked && parseInt(this.credits.val()) < parseInt(this.value.val())) {
      this.value.val(this.credits.val());
      this.resetReward();
    }
  },

  clickAnonymous: function(){
    $('#anonymous_warning').fadeToggle();
  },

  clickReward: function(event){
    var option = this.$(event.currentTarget);
    this.selectReward(option);
    this.value.val(this.reward().minimum_value);
  },

  reward: function(){
    var $reward = this.$('input[type=radio]:checked');
    if($reward.length > 0){
      return _.find(this.rewards, function(r){ return r.id == $reward.val() });
    }
  },

  selectReward: function(reward){
    this.choices.removeClass('selected');
    reward.prop('checked', true);
    reward.parents('.choice:first').addClass('selected')
  },

  resetReward: function(event){
    var reward = this.reward();
    if(reward){
      var value = this.value.val();
      if(!(/^(\d+)$/.test(value)) || (parseInt(value) < reward.minimum_value)){
        this.selectReward(this.$('#backer_reward_id'));
      }
    }
  },

  activate: function(){
    this.value = this.$('#backer_value');
    this.rewards = this.value.data('rewards');
    this.choices = this.$('li.choice');
    this.credits = this.$('#credits');
    this.selectReward(this.$('input[type=radio]:checked'));
    this.setupForm();
    $('.procceed-button').affix({offset: {
        bottom: 800
    }})
  }
}, Skull.Form));

