const { Client, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ms = require("ms")
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")
// Lourity - discord.gg/altyapilar
module.exports = {
    name: "market",
    description: "Hadi biraz alışveriş yapalım!",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("🎵")
                    .setLabel("Spotify")
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("spotify" + interaction.user.id)
            )
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("▶️")
                    .setLabel("Youtube")
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("youtube" + interaction.user.id)
            )

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komutu kullanırken bir sorun oluştu.")

        let kredi = louritydb.get(`kredi_${interaction.user.id}`)

        const market = new EmbedBuilder()
            .setColor("5865f2")
            .setTitle(`Raven Market | Davet/Sohbet Et, kazan! (${kredi || "0"} $)`)
            .setURL("https://discord.gg/altyapilar")
            .setDescription(`**/günlük - Bedava günlük kredini almayı unutma!**`)
            .addFields(
                { name: "🎵 spotify", value: `Spotify Premium (1 Ay): 5000 Kredi` },
                { name: "▶️ youtube", value: `Youtube Premium (1 Ay): 13000 Kredi` },
            )
            .setFooter({ text: "İnsanları Raven'e davet et/sohbet et, kredi kazan 😉", iconURL: client.user.avatarURL() })
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()

        interaction.reply({ embeds: [market], components: [row] }).catch((e) => {
            // console.log(e) //hata olduğunda görmek için // ları silin
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })

    }

};