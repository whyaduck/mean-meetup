/**
 * Created by stephenward on 11/14/13.
 */

exports.list = function(req, res){

    var contact = req.app.db.model('contact') ;

    var query = contact.find() ;
    query.sort({lastName:'asc'}) ;
    query.exec(function(err,data){
        if(err){
            console.log(err);
            res.send(500) ;
        }
        res.json(data) ;
    })


};


exports.get = function(req, res){

    var contact = req.app.db.model('contact') ;


    try{
        var id = req.params['contactId'] ;
        contact.findOne({_id: id}, function(err,data){
            console.log('find by id') ;
            res.json(data) ;
        });
    }
    catch(e){
        console.log(e);
        res.send(e) ;
    }


};


exports.post = function(req,res){
    var contact =  req.app.db.model('contact');
    // console.log(req.body) ;
    var newcontact = new contact(req.body);
    newcontact.validate(function(error) {
        if (error) {
            res.json({ error : error });
        } else {

            newcontact.save(function(err,data){

                res.send(data) ;
            })
        }
    });
}   ;

exports.put = function(req,res){
    var contact =  req.app.db.model('contact');
    // console.log(req.body) ;
    var newcontact = new contact(req.body);
    newcontact.validate(function(error) {
        if (error) {
            res.json({ error : error });
        } else {
            delete req.body._id ;
            contact.findByIdAndUpdate({_id:newcontact._id},{$set:req.body},function(err,data){
                res.json(data) ;
            })

        }
    });
}   ;

exports.delete = function(req,res){
    var contact =  req.app.db.model('contact');
    contact.remove({_id:req.params['contactId']},function(err,data){
        if(err) console.log(err) ;
        res.json(data) ;
    }) ;

} ;

