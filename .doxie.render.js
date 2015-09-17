module.exports = (doc) => (
`
#####  ${doc.data.description.summary}

${doc.data.tags
  .filter(tag => tag.type === 'jsig')
  .map(tag => (
`\`\`\`js
${tag.string.replace(/^  /mg, '')}
\`\`\`
<div align="right"><sup>JSIG SIGNATURE <a href="http://jsig.biz/">(?)</a></sup></div>
`))}
${doc.data.description.body}

`);
