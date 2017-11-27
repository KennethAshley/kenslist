import Web3 from 'web3'

let getWeb3 = new Promise((resolve, reject) => {
  window.addEventListener('load', () => {
    let web3 = window.web3
    let results

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider)
      results = { web3 }
      console.log('Injected web3 detected')
      resolve(results)
    } else {
      let provider = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
      web3 = new Web3(provider)
      results = { web3 }
      console.log('No web3 instance injected, using local web3')
      resolve(results)
    }
  })
})

export default getWeb3
