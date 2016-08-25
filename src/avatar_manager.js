// manages avatar states and actions
var AvatarManager = function(){

  var DIRECTION = {
    a:'west',
    s:'south',
    d:'east',
    w:'north'
  }

  var avatar = {
    pos_x: 0,
    pos_y: 0,
    vol_x: 0,
    vol_y: 0,
    speed: 500,
    charges: 0
  };

  var input,
  level_manager,
  path,
  checkpoint;
  var moving = false,
  current_spot;


  function start_path(p){
    path = p.checkpoints;
  }

  function set_avatar_volocity(){
    var vol = utils.normalize(avatar.pos_x, avatar.pos_y, path[checkpoint].x, path[checkpoint].y);
    avatar.vol_x = vol[0] * avatar.speed;
    avatar.vol_y = vol[1] * avatar.speed;
  }

  function move_avatar(delta){
    if (!moving){return;}
    avatar.pos_x += (avatar.vol_x*delta);
    avatar.pos_y += (avatar.vol_y*delta);
    if (avatar.vol_x > 0 && avatar.pos_x > path[checkpoint].x){
      go_to_checkpoint();
    }else if (avatar.vol_x < 0 && avatar.pos_x < path[checkpoint].x){
      go_to_checkpoint();
    }
    if (avatar.vol_y > 0 && avatar.pos_y > path[checkpoint].y){
      go_to_checkpoint();
    }else if (avatar.vol_y < 0 && avatar.pos_y < path[checkpoint].y){
      go_to_checkpoint();
    }


    function go_to_checkpoint(){
      avatar.pos_x = path[checkpoint].x;
      avatar.pos_y = path[checkpoint].y;
      checkpoint++
      if (checkpoint >= path.length){
        current_spot = next_spot;
        moving = false;
      }else{
        set_avatar_volocity();
      }
    }

  }



  function jump_to_spot(spot){
    current_spot = spot;
    avatar.pos_x = spot.x * CONFIG.grid_size;
    avatar.pos_y = spot.y * CONFIG.grid_size;
  }

  function start_level(){
    moving = false;
    jump_to_spot(level_manager.starting_spot);
  }

  function update(delta){
    move_avatar(delta);
  }

  function get_avatar(){
    return avatar;
  };

  function inject_input(_input_){
    input = _input_;
    input.add_subscriber(this)
  }

  function key_pressed(key){
    if (!moving){
      var move_leads_to = level_manager.move_leads_to(current_spot, DIRECTION[key]);
      if (move_leads_to){
        // jump_to_spot(move_leads_to.spot);
        path = move_leads_to.path.checkpoints.slice(0);
        if (path[0].x !== avatar.pos_x || path[0].y !== avatar.pos_y){
          path.reverse();
        }
        checkpoint = 1;
        next_spot = move_leads_to.spot;
        set_avatar_volocity();
        moving = true;
      }
    }
  }

  function inject_level_manager(_level_manager_){
    level_manager = _level_manager_;
  }

  this.update = update;
  this.get_avatar = get_avatar;
  this.start_level = start_level;
  this.inject_input = inject_input;
  this.key_pressed = key_pressed;
  this.inject_level_manager = inject_level_manager;

};
