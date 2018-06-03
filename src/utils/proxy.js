async function getSearch(slug) {
  const res = await fetch(`https://thingproxy.freeboard.io/fetch/https://git.zipcode.rocks/api/v1/repos/search?q=${slug}`)
  const json = await res.json();
  return json;
}

async function getPulls(slug) {
  const res = await fetch(`https://thingproxy.freeboard.io/fetch/https://git.zipcode.rocks/api/v1/repos/ZipCodeWilmington/${slug}/pulls`)
  const json = await res.json();
  return json.length
}

const showdown = require('showdown')
async function getReadme(slug) {
  //const res = await fetch(`https://thingproxy.freeboard.io/fetch/https://git.zipcode.rocks/api/v1/repos/ZipCodeWilmington/${slug}/raw/README.md`)
  //const text = await res.text()
  const converter = new showdown.Converter()
  const html = await converter.makeHTML(text)
  return html
}

async function getId(json) {
  let id = null
  json.data.forEach(repo => {
    if (repo.owner.login === "ZipCodeWilmington") {
      id = repo.id
    }
  })
  return id
}

async function getFork(slug) {
  const json = await getSearch(slug)
  const id = await getId(json)
  return id
}

export default {
  getSearch,
  getFork,
  getPulls,
  getReadme
}

/*
  async created() {
    let event = await firebase.database().ref('labs')
    let snap = await event.once('value')
    let val = await snap.val()
    Object.entries(val).forEach(async (entry) => {
      console.log(val[entry[0]].instructor)
      let instructor = val[entry[0]].instructor
      if (instructor == 'Kris &#x1F36B;') {
        instructor = `Kris`
      }
      if (instructor == 'Froilan &#x1F367;') {
        instructor = `Froilan`
      }
      if (instructor == 'Dolio &#x1F35F;') {
        instructor = `Dolio`
      }
      if (instructor ==  `Nhu &#x1F36A;`) {
        instructor = `Nhu`
      }
        firebase.database().ref('labs').child(entry[0]).update(
          {
            instructor
          }
        )
    })
  },
  */
