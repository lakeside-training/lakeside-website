import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const Policy = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [title, setTitle] = useState("Privacy Policy")

  const getPageTitle = (key) => {
    const obj = {
      terms_coditions: "Terms & Conditions",
      privacy_policy: "Privacy Policy",
      cookie_policy: "Cookie Policy",
      customer_support: "Customer Support"
    }
    return obj[key] || obj.terms_coditions
  }

  useEffect(() => {
    const title = getPageTitle(queryParams.get("title"))
    setTitle(title)
  }, [location])

  return (
    <div>
      <div className="practiceArea-head text-gray-900 text-center lg:w-[50%] mx-auto w-[90%] xs:w-[80%] md:w-[70%]">
        <div className="flex flex-col items-center justify-center">
          <h2 className="mt-16 mb-4 text-4xl font-bold">{title}</h2>
          <a className="text-[blue] underline text-[18px]" target={"_blank"} href="https://www.learnlakeside.com">www.learnlakeside.com</a>
          <p className="mt-2 text-[18px] font-plus_jakarta_sans font-[600]">Effective date: 1st January 2023</p>
        </div>
      </div>

      <div
        className=" pt-20 flex flex-col justify-center flex-wrap lg:w-[50%] mx-auto w-[90%] xs:w-[80%] md:w-[70%]"
      >
        <h2 className="text-3xl font-bold">Introduction</h2>
        <p className="py-6  font-plus_jakarta_sans font-[600]">
          Welcome to the Lakeside Training website which is located on <a className="text-[blue] underline text-[18px]" target={"_blank"} href="https://www.learnlakeside.com">www.learnlakeside.com</a> (“Site” or “Website”).
        </p>
        <p>
          This website is owned and operated by The Lakeside L.L.C from the United States. Throughout the Site, the terms “we”, “us”, “Lakeside Training”, “Company” and “our” refer to The Lakeside L.L.C. We offer this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
          <br />
          <br />
          By visiting our site and/ or purchasing something from us, you (“Client”) engage in our “Service” and agree to be bound by the following terms and conditions (“Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms and Conditions apply to all users of the site, including without limitation users who are browsers, clients, and/ or contributors of content.
        </p>
      </div>

      <div
        className="  flex flex-col justify-center flex-warp lg:w-[50%] mx-auto w-[90%] xs:w-[80%] md:w-[70%]"
      >
        <h2 className="mt-4 mb-4 text-xl font-bold uppercase">Please read then following terms and disclaimers carefully before using the services. By accessing or using ours services, You agree to these terms, conditions, and all applicable laws. If you do not agree with these terms, Our privacy policy, Or any other of our policy, You should not use the services.</h2>
        <h2 className="mt-2 text-2xl font-bold">About</h2>
        <p className="py-2 ">
          Lakeside Training offers resource based learning with hands on, interactive problem solving to help you achieve your career goals. Our services include but are not limited to Simulated Learning Labs, Corporate training, Interview Prep and Trainings/Resource based learning. For more information, please refer to our website.
        </p>
        <h2 className="text-2xl font-bold">Sole discretion</h2>
        <p className="py-2 ">
          We reserve the right to add/discontinue any product or service anytime at the sole discretion and without notice.
        </p>
        <h2 className="text-2xl font-bold">Responsibility </h2>
        <p className="py-2 ">
          For any training, resources, coaching, advice, or information Lakeside Training provides, the client has sole responsibility for any decisions they may make following coaching with Lakeside Training. Remarkable results can be achieved where clients follow a clear plan in a committed way.  Lakeside Training accepts no liability for the client’s actions and offers no guarantees for a result. Lakeside Training has no liability for any loss incurred by any client, whether financial or otherwise, following commencement of any coaching, advise or based on any advice or documentation given by Lakeside Training either on the site, at an event or for any perceived failure by the client, whether justified or otherwise, to achieve a material improvement in the quality of life or to achieve their desired outcomes or goals.
        </p>
        <h2 className="text-2xl font-bold">Eligibility</h2>
        <p className="py-2 ">
          The purchase of our services is strictly limited to parties who can lawfully enter into and form contracts on the Internet.
        </p>
        <p className="py-2 ">
          By purchasing any service, you expressly authorize us to perform credit checks and where Lakeside Training feels necessary, to transmit or to obtain information (including any updated information) about you to or from third parties, including but not limited to your credit/debit card number or credit reports, to authenticate your identity, to validate your credit/debit card, to obtain an initial credit/debit card authorization and to authorize individual purchase transactions.
        </p>
        <p className="py-2 ">
          Lakeside Training reserves the right to restrict multiple quantities of an item being shipped to any one Client or postal address.
        </p>
        <h2 className="text-2xl font-bold">Payment </h2>
        <p className="py-2 ">
          All Clients are required to pay for the services in advance, including the coaching session packages, according to the payment method stated by Lakeside Training. Following the current per session fee or fee for a program of sessions, or any other such fee as shall be agreed and notified to the client. We will confirm the fees in writing, usually by email, unless this is impractical. The number of sessions for which payment is required in advance will be agreed before coaching sessions commence.
        </p>
        <h2 className="text-2xl font-bold">Pricing Policy</h2>
        <p className="py-2 ">
          All prices are in US Dollars and are exclusive of taxes.
        </p>
        <h2 className="text-2xl font-bold">Permitted use </h2>
        <p className="py-2 ">
          You agree to use the Site and the Services only for purposes that are permitted by these Terms and Conditions and in compliance with all applicable laws, regulations, and generally accepted practices or guidelines in the relevant jurisdictions. You may only use the Site and Services for your non-commercial, non-exclusive, non-assignable, non-transferable, and limited personal use, and no other purposes.
        </p>
        <p className="py-2 ">
          You will not (and will not attempt to):
        </p>
        <ul className="ml-10">
          <li className="py-2 list-disc">Access any of the Services by any means other than through the interface that is provided by Lakeside Training</li>
          <li className="py-2 list-disc">Gain unauthorised access to Lakeside Training’s computer system or engage in any activity that interferes with the performance of, or impairs the functionality or security of the Site, the Services, Lakeside Training’s networks, and computer systems</li>
          <li className="py-2 list-disc">Access any of the Site or the Services through any automated means or with any automated features or devices (including use of scripts or web crawlers);</li>
          <li className="py-2 list-disc">Access or collect any personally identifiable information, including any names, email addresses or other such information for any purpose, including, without limitation, commercial purposes;</li>
          <li className="py-2 list-disc">Reproduce, duplicate, copy, sell, trade, or resell any aspect of the Site or the Services for any purpose; and</li>
          <li className="py-2 list-disc">Reproduce, duplicate, copy, sell, trade or resell any products or services bearing any trademark, service mark, trade name, logo or service mark owned by Lakeside Training in a way that is likely or intended to confuse the owner or authorized user of such marks, names or logos.</li>
        </ul>
        <h2 className="text-2xl font-bold">Limited License and Site Access; Acceptable Use</h2>
        <p className="py-2 ">
          We grant you a limited license to use the Site for personal non-commercial use only. You may not: (a) resell or make any commercial use of this Site or any of the contents of this Site; (b) modify, adapt, translate, reverse engineer, decompile, disassemble or convert any of the contents of this Site not intended to be so read; (c) copy, imitate, mirror, reproduce, distribute, publish, download, display, perform, post or transmit any of the contents of this Site in any form or by any means; or (d) use any data mining, bots, spiders, automated tools or similar data gathering and extraction methods on the contents of the Site or to collect any information from the Site or any other user of the Site.
        </p>
        <p className="py-2 ">
          You use this Site at your own risk. You agree that you will be personally responsible for your use of this Site and all of your communication and activity on this Site. If we determine, in our sole discretion, that you engaged in prohibited activities, were not respectful of other users, or otherwise violated the Terms and Conditions, we may deny you access to this Site on a temporary or permanent basis and any decision to do so is final.
        </p>
        <h2 className="text-2xl font-bold">Accounts, Registrations, and Passwords</h2>
        <p className="py-2 ">
          If you use this Site and such use requires setting up an account and/or password(s), you are solely responsible for maintaining the confidentiality of your account and password(s) and for restricting access to your computer.  If you open an account, register, or otherwise provide us with any information, you agree to provide us with current, complete, and accurate information as requested by any forms. Lakeside Training is not responsible for any errors or delays in responding to any inquiry or request caused by any incorrect, outdated, or incorrect information provided by you or any technical problems beyond the control of Lakeside Training. You acknowledge and agree that any login, identifier, or password issued in connection with this Site (each a "Password") is confidential information and must be kept secure. You may not disclose such a Password to another person or entity or permit another entity to access the Site using such a Password. You must notify Lakeside Training immediately of any breach of security or unauthorised use of your account. Lakeside Training cannot be responsible and disclaims all liability in connection with, the use of any information that you post or display on this Site.
        </p>
        <h2 className="text-2xl font-bold">Refunds and Cancellations</h2>
        <p className="py-2 ">
          Please refer to our Refunds and Cancellations policy for more information on this section.
        </p>
        <h2 className="text-2xl font-bold">Intellectual Property Rights</h2>
        <p className="py-2 ">
          Your use of the Site and its contents grants no rights to you concerning any copyright, designs, and trademarks and all other intellectual property and material rights mentioned, displayed, or relating to the Content (any content provided by Lakeside Training) on the Site and through its services.  All Content, including third party trademarks, designs, and related intellectual property rights mentioned or displayed on this Site, are protected by national intellectual property and other laws. Any unauthorized reproduction, redistribution or other use of the Content is prohibited and may result in civil and criminal penalties. You may use the Content only with our prior written and express authorization. To inquire about obtaining authorization to use the Content, please contact us at <a className="text-[blue] underline text-[18px]" target={"_blank"} href="https://www.learnlakeside.com">@learnlakeside.com</a>
        </p>
        <h2 className="text-2xl font-bold">Intellectual Property Rights</h2>
        <p className="py-2 ">
          Lakeside Training expects all users to respect the intellectual property rights of others. Lakeside Training may remove material that appears in its sole discretion to infringe upon the intellectual property rights of others and we will terminate the access rights of any repeat infringer. If you are a copyright owner or an agent thereof and believe that any Content infringes upon your copyrights, you may notify us at  <a className="text-[blue] underline text-[18px]" target={"_blank"} href="https://www.learnlakeside.com">@learnlakeside.com .</a> The notification must include the following information: physical or electronic signature of the owner or authorized agent of the owner of the allegedly infringed work; identification of the allegedly infringed work; identification of the material that is claimed to be infringing and reasonably sufficient information for Lakeside Training to locate the material; contact information of the notifying party, such as an address, telephone number, and email; a statement that the notifying party has a good faith belief that the use of the material in the manner complained of is not authorized by the owner of the allegedly infringed work, its agent or the law; and a statement, under penalty of perjury that the information in the notification is accurate and the notifying party is the owner or authorized agent of the allegedly infringed work.
        </p>
        <h2 className="text-2xl font-bold">Monitoring Activity</h2>
        <p className="py-2 ">
          Lakeside Training has no obligation to monitor this Site or any portion thereof. However, we reserve the right to review any posted content and remove, delete, redact or otherwise modify such content, in our sole discretion, at any time and from time to time, without notice or further obligation to you. Lakeside Training has no obligation to display or post any content.
        </p>
        <h2 className="text-2xl font-bold">Disclaimer</h2>
        <p className="py-2 ">
          To the fullest extent permissible under applicable law, lakeside training expressly disclaims any and all warranties and representations, express or implied, including any (a) warranties of merchantability or fitness for a particular purpose or use as to the site and its content, including the information, data, software, or products contained therein, or the results obtained by their use or as to the performance thereof, (b) warranties or conditions arising through course of dealing, and (c) warranties or conditions of uninterrupted or error-free access or use. the site and all contents therein and components thereof are provided on an “as is” basis and your use of the site is at your own risk.
        </p>
        <h2 className="text-2xl font-bold">Limitation of Liability</h2>
        <p className="py-2 ">
          You agree that in no event shall Lakeside Training be liable to you, or any third party, for any lost profits, incidental, consequential, punitive, special, or indirect damages arising out of or in connection with the Site or the Terms and Conditions, even if advised as to the possibility of such damages, regardless of whether the claim for such damages is based in contract, tort, strict liability or otherwise. This limitation on liability includes, but is not limited to, any (i) errors, mistakes, or inaccuracies in any Content or for any loss or damage of any kind incurred by you as a result of your use of or reliance on the Content; (ii) the transmission of any bugs, viruses, Trojan horses or the like which may infect your equipment, failure of mechanical or electronic equipment; (iii) unauthorized access to or use of the Site or Lakeside Training' secure servers and/or any personal information and/or financial information stored therein; or (iv) theft, operator errors, strikes or other labor problems or any force majeure.
        </p>
        <h2 className="text-2xl font-bold">Indemnification</h2>
        <p className="py-2 ">
          You agree to indemnify and hold Lakeside Training and its subsidiaries, affiliates, officers, directors, agents, and employees, harmless from and against any suit, action, claim, demand, penalty or loss, including reasonable attorneys’ fees, made by or resulting from any third party due to or arising out of your use of the Site, breach of the Terms and Conditions or the materials it incorporates by reference, or your violation of any law, regulation, order or other legal mandates, or the rights of a third party
        </p>
        <h2 className="text-2xl font-bold">Dispute Resolution & Governing Laws</h2>
        <p className="py-2 ">
          In the event of a dispute arising out of or in connection with these terms or any contract between you and us, then you agree to attempt to settle the dispute by engaging in good faith with us in a process of mediation before commencing arbitration or litigation.
        </p>
        <p className="py-2 ">
          These Terms and Conditions shall be governed by and construed in accordance with the law of the State of Texas, United States and you hereby submit to the exclusive jurisdiction of the Texas courts.
        </p>
        <h2 className="text-2xl font-bold">Children</h2>
        <p className="py-2 ">
          We are in compliance with the requirements of COPPA (Childrens Online Privacy Protection Act), we do not collect any information from anyone under 13 years of age intentionally.
        </p>
        <h2 className="text-2xl font-bold">Privacy & Cookies</h2>
        <p className="py-2 ">
          For more information on how we collect your information and cookies, please refer to our Privacy Policy and Cookie Policy.
        </p>
        <h2 className="text-2xl font-bold">Changes</h2>
        <p className="py-2 ">
          We reserve the right to update and revise these Terms and Conditions at any time. You will know if these Terms and Conditions have been revised since your last visit to the website by referring to the "Effective Date of Current Policy" date at the top of this page. Your use of our Site constitutes your acceptance of these Terms and Conditions as amended or revised by us from time to time, and you should, therefore, review these Terms and Conditions regularly.
        </p>
        <h2 className="text-2xl font-bold">Electronic Communications</h2>
        <p className="py-2 ">
          When you visit the Site or send us e-mails, you are communicating with us electronically. In so doing, you consent to receive communications from us electronically. You agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement that such communication is in writing.
        </p>
        <h2 className="text-2xl font-bold">Severability</h2>
        <p className="py-2 ">
          If any of these Terms and Conditions shall be deemed invalid, void, or for any reason unenforceable, that term shall be deemed severable and shall not affect the validity and enforceability of any remaining terms or conditions.
        </p>
        <h2 className="text-2xl font-bold">Assignment</h2>
        <p className="py-2 ">
          We shall be permitted to assign, transfer, or subcontract our rights and obligations under these terms without your consent or any notice to you. You shall not be permitted to assign, transfer, or subcontract any of your rights and obligations under this agreement.
        </p>
        <h2 className="text-2xl font-bold">Force Majeure</h2>
        <p className="py-2 ">
          Lakeside Training is not liable for any delays caused by circumstances beyond Lakeside Training’s control, e.g. general labor dispute, extreme weather, acts of war, fire, lightning, terrorist attacks, changed governmental orders, technical problems, defects in power- /tele-/computer communications or other communication and defects or delays in the service by sub-suppliers due to circumstances set forth above. Such circumstances shall result in relief from damages and other measures. If any such situation should arise, Lakeside Training shall inform the Client accordingly both at the beginning and the end of the period for the current situation. If the situation has lasted for more than two months, both the Client and Lakeside Training are entitled to terminate the purchase with immediate effect.
        </p>
        <h2 className="text-2xl font-bold">Entire Agreement</h2>
        <p className="py-2 ">
          These Terms and Conditions set forth the entire understanding and agreement between you and Lakeside Training concerning the subject matter herein and supers all prior or contemporaneous communications and proposals, whether electronic, oral or written concerning the Site. A printed version of these Terms and Conditions and any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to these Terms and Conditions to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. Any rights not expressly granted herein are reserved. You may not assign the Terms and Conditions, or assign, transfer or sublicense your rights therein. A failure to act concerning a breach by you or others does not waive Lakeside Training's right to act concerning subsequent or similar breaches.
        </p>
        <h2 className="text-2xl font-bold">Term and Termination</h2>
        <p className="py-2 ">
          This agreement becomes effective the date that you first access the Site and remains effective until it is terminated consistent with its terms. Violations of this agreement may result in the immediate termination of this agreement and denials or terminations of your access to the Site. Such restrictions may be temporary or permanent. Upon termination, your right to use this Site shall be revoked. All disclaimers, limitations of liability, indemnities, and rights of ownership and licenses to Lakeside Training shall survive any termination.
        </p>
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <p className="py-2 ">
          For any questions, complaints, and queries or to report any violations, kindly get in touch:
        </p>
        <h2 className="text-3xl mt-16 font-bold">The Lakeside L.L.C</h2>
        <p className="py-2  font-plus_jakarta_sans font-[600] text-[18px]">Email: ---@learnlakeside.com</p>
      </div>

    </div>
  )
}

export default Policy
