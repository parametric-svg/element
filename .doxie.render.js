module.exports = (doc) => (
`#####  ${doc.data.description.summary}

${doc.data.tags
  .filter(tag => tag.type === 'jsig')
  .map(tag => (
`<div align="right"><sub>JSIG SIGNATURE <a href="http://jsig.biz/">(?)</a></sub></div>
\`\`\`js
${tag.string.replace(/^  /mg, '')}
\`\`\`
`))}
${doc.data.description.body}
`);
