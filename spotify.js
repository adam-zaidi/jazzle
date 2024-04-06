// function callToken() {
//     let parameters = ["client_id" : "3f003b5880f64a0ca6e6e4276f31339b",// u get in developer account in Spotify.
//                       "client_secret" : "be52b966c4e4421fbdac923356844170",
//                       "grant_type" : "client_credentials"]
//     Alamofire.request("https://accounts.spotify.com/api/token", method: .post, parameters: parameters).responseJSON(completionHandler: {
//         response in
//         print(response)
//         print(response.result)
//         print(response.result.value)
//         if let result = response.result.value {
//             let jsonData = result as! NSDictionary
//             let token = jsonData.value(forKey: "access_token") as? String
//             print(token!)
//           }
// })
// } 