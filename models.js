/**
 * Created by stephen on 11/10/13.
 */
exports = module.exports = function(app,mongoose){
    require('./schema/users')(app,mongoose) ;
    require('./schema/documents')(app,mongoose);
    require('./schema/communications')(app,mongoose) ;
    require('./schema/contacts')(app,mongoose) ;

}