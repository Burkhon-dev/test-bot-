const { Telegraf , Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Hello ${ctx.message.from.first_name}`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('Photos', async (ctx) => {
    try{
        await ctx.replyWithHTML('<b>Photos</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Photo1', 'btn_1'), Markup.button.callback('Photo2', 'btn_2'), Markup.button.callback('Photo3', 'btn_3')]
            ]
        ))
    } catch(err) {
        console.error(err)
    }
})



function addAcctionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if(src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch(err) {
            console.error(err)
        }
    })
}

addAcctionBot('btn_1','./img/1.jpg', text.text1)
addAcctionBot('btn_2','./img/2.jpg', text.text2)
addAcctionBot('btn_3',false, text.text3)

bot.launch()


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))