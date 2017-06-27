var mongoose = require('mongoose'),
    Team = mongoose.model('Team'),
    Channel = mongoose.model('Channel'),
    Persona = mongoose.model('Persona');


exports.create = function (req, res) {
    console.log("Creating new channel with the teamId: " + req.params.teamId);

    Team.findOne({ _id: req.params.teamId }, function (teamFindErr, team) {
        if (teamFindErr) {

            res.json({ success: false, message: "Could not find Team with Id: " + req.params.teamId, errors: "No such Team exists!" })

        } else {

            Persona.findOne({ _id: req.body.personaId }, function (personaFindErr, persona) {

                if (personaFindErr) {

                    res.json({ success: false, message: "Could not find persona with Id: " + req.body.personaId, errors: "No such User exists!" })

                } else {

                    var newChannel = new Channel({
                        name: req.body.teamName,
                        private: req.body.private,
                        purpose: req.body.purpose,
                        _team: team
                    })
                    newChannel._members.push(persona);

                    newChannel.save(function (newChannelSaveErr) {

                        if (newChannelSaveErr) {

                            res.json({ success: false, message: "Could not create new Channel Document in Channel Collection.. The object failed validations ", errors: "Channel Failed to be created!" })

                        } else {

                            res.json({ success: true, message: "New Channel was created with Id: " + newChannel._id + "with personaId: " + persona._id + " as its first member" })
                        }
                    })
                }
            })
        }
    })
}

exports.update = function (req, res) {

    Channel.update({ _id: req.params.channelId }, { $set: req.body }, function (channelUpdateErr) {

        if (channelUpdateErr) {

            res.json({ success: false, message: "Channel with id:" + req.params.channelId + " was not updated ", errors: "channel update was unsuccessful!" })

        } else {

            res.json({ success: true, message: "Channel with id: " + req.params.channelId + "successfully updated!" })

        }
    })
}

exports.delete = function (req, res) { // true means it is removing just one
    channel = req.params.channelId

    Channel.remove({ _id: channel }, true, function (channelRemoveErr) {
        
        if (channelRemoveErr) {
        
            res.json({ success: false, message: "Channel with Id: " + channel + " has not been removed", errors: "Channel failed to be removed!" })
        
        } else {
       
            res.json({ sucess: true, message: "Channel with Id: " + channel + "removed!" })
        }
    });
}

exports.invite = function (req, res) {
    var channelId = req.params.channelId,
        personaId = req.body.personaId

    Channel.findOne({ _id: channelId }, function (channelfindErr, channel) {

        if (channelfindErr) {

            res.json({ success: false, message: "Could not find channel with Id: " + channelId, errors: "Could not add user to channel!" })

        } else {

            Persona.findOne({ _id: personaId }, function (findPersonaErr, persona) {

                if (findPersonaErr) {

                    res.json({ success: false, message: "Could not find persona with Id: " + personaId, errors: "Could not add user to channel!" })

                } else {

                    channel.members.push(persona)

                    channel.save(function (channelSaveErr) {

                        if (channelSaveErr) {

                            res.json({ success: false, message: "Could not save channel updates to members", errors: "Could not add user to channel!" })

                        } else {

                            res.json({ success: true, message: "Channel successfully added persona with Id: " + user._id })
                        }
                    })
                }
            })

        }
    })
}




